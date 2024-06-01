use std::error::Error;

use bson::Uuid;
use futures::Future;
use serde::{Deserialize, Serialize};
use serde_json;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpListener;

use crate::analyze::criteria::Criteria;
use crate::analyze::AnalysisResult;

const ADDR: &str = "127.0.0.1:6000";

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestJSON {
    pub form: Uuid,
    pub analysis: Vec<Criteria>,
}
#[derive(Serialize, Deserialize)]
enum ResponseStatus {
    Fail,
    Success,
}
#[derive(Serialize, Deserialize)]
struct ResponseJSON<T> {
    pub status: ResponseStatus,
    pub data: Option<T>,
    pub message: String,
}

pub async fn listen<F, Fut>(process_request: F) -> Result<(), Box<dyn Error>>
where
    F: Fn(RequestJSON) -> Fut + Copy + Send + 'static,
    Fut: Future<Output = AnalysisResult> + Send,
{
    let listener = TcpListener::bind(ADDR).await?;
    println!("Listening on {}", listener.local_addr()?);

    loop {
        let (mut socket, addr) = listener.accept().await?;
        println!("Received connection from {}", addr);

        let process_request = process_request;

        tokio::spawn(async move {
            let mut buffer = vec![0; 1024]; // Buffer for reading data

            match socket.read(&mut buffer).await {
                Ok(size) if size > 0 => {
                    let request: Result<RequestJSON, _> = serde_json::from_slice(&buffer[..size]);

                    match request {
                        Ok(req) => {
                            println!("Received request: {:?}", req);

                            let response = construct_response(req, process_request).await;
                            let serialized =
                                serde_json::to_string(&response).unwrap_or_else(|_| {
                                    String::from("{\"error\": \"Failed to serialize response\"}")
                                });
                            if let Err(e) = socket.write_all(serialized.as_bytes()).await {
                                eprintln!("Failed to send response: {}", e);
                            }
                        }
                        Err(e) => {
                            println!("Failed to deserialize request: {}", e);
                        }
                    }
                }
                Ok(_) => {
                    println!("Connection closed by client.");
                }
                Err(e) => {
                    println!("Failed to read from socket: {}", e);
                }
            }
        });
    }
}
async fn construct_response<F, Fut>(req: RequestJSON, processor: F) -> ResponseJSON<Vec<f64>>
where
    F: Fn(RequestJSON) -> Fut + Copy + Send + 'static,
    Fut: Future<Output = AnalysisResult> + Send,
{
    match processor(req).await {
        AnalysisResult::Success(data) => ResponseJSON {
            status: ResponseStatus::Success,
            data: Some(data),
            message: "Analysis successful".to_string(),
        },
        AnalysisResult::NoAnswersFound => ResponseJSON {
            status: ResponseStatus::Fail,
            data: None,
            message: "No answers found for the given criteria".to_string(),
        },
        AnalysisResult::NoFormsFound => ResponseJSON {
            status: ResponseStatus::Fail,
            data: None,
            message: "No forms found for the given form ID".to_string(),
        },
        AnalysisResult::BadRequest(message) => ResponseJSON {
            status: ResponseStatus::Fail,
            data: None,
            message: message,
        },
    }
}

use analize::criteria::Criteria;
use futures::stream::StreamExt;
use mongodb::{options::ClientOptions, Client};
use schemas::analysis::AnalysisRequest;
use schemas::answer::FormAnswer;

mod analize;
mod schemas;

const DB_URI: &str = "mongodb://127.0.0.1:27017";
const DB_NAME: &str = "former";
const COLLECTION_FORMS: &str = "form";
const COLLECTION_ANSWERS: &str = "form_answer";
const COLLECTION_ANALYSIS: &str = "form_analysis";

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let mut requests = vec![
        AnalysisRequest {
            component_index: 0,
            criteria: Criteria::Equals {
                value: "TEST".to_string(),
            },
        },
        AnalysisRequest {
            component_index: 0,
            criteria: Criteria::Equals {
                value: "Actual first answer value here".to_string(),
            },
        },
    ];

    let client_uri = DB_URI;
    let mut client_options = ClientOptions::parse(client_uri).await?;
    client_options.app_name = Some("answer_aggregator".to_string());

    let client = Client::with_options(client_options)?;

    let database = client.database(DB_NAME);
    let answers_collection: mongodb::Collection<FormAnswer> =
        database.collection(COLLECTION_ANSWERS);

    let mut cursor = answers_collection.find(None, None).await?;

    if let Some(answer_doc) = cursor.next().await {
        let answer = answer_doc?;
        let curr_answer = &answer.answers[0];
        requests[1].criteria = Criteria::Equals {
            value: curr_answer.to_string(),
        };
        let analysis = answer.analyze(&requests[..]);
        dbg!(analysis);
    } else {
        println!("No answers found in the collection.");
    }

    Ok(())
}

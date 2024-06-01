use analyze::AnalysisResult;
use futures::TryStreamExt;
use mongodb::{bson::oid::ObjectId, options::ClientOptions, Client};
use schemas::answer::FormAnswer;
use schemas::form::Form;

mod analyze;
mod listener;
mod schemas;

const DB_URI: &str = "mongodb://127.0.0.1:27017";
const DB_NAME: &str = "former";
const COLLECTION_FORMS: &str = "form";
const COLLECTION_ANSWERS: &str = "form_answer";

use std::str::FromStr;
use std::sync::Arc;

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let mut client_options = ClientOptions::parse(DB_URI).await?;
    client_options.app_name = Some("answer_aggregator".to_string());
    let client = Client::with_options(client_options)?;

    let database = client.database(DB_NAME);
    let answers_collection = Arc::new(database.collection::<FormAnswer>(COLLECTION_ANSWERS));
    let forms_collection = Arc::new(database.collection::<Form>(COLLECTION_FORMS));

    let _ = listener::listen(move |req| {
        let forms_collection = forms_collection.clone();
        let answers_collection = answers_collection.clone();
        async move {
            let form_uuid = ObjectId::from_str(&req.form).unwrap_or_default();
            match forms_collection
                .find_one(bson::doc! {"_id": form_uuid}, None) // Corrected query
                .await
            {
                Ok(Some(form)) => {
                    // Fetch answers related to this form
                    match answers_collection
                        .find(bson::doc! {"form_id": form_uuid}, None)
                        .await
                    {
                        Ok(cursor) => {
                            let answers: Vec<FormAnswer> =
                                cursor.try_collect().await.unwrap_or_default();
                            let analysis_results = form.analyze(&answers, &req.analysis);
                            AnalysisResult::Success(analysis_results)
                        }
                        Err(_) => AnalysisResult::NoAnswersFound,
                    }
                }
                Ok(None) => AnalysisResult::NoFormsFound,
                Err(_) => AnalysisResult::BadRequest("Failed to fetch form data".to_string()),
            }
        }
    })
    .await;

    Ok(())
}

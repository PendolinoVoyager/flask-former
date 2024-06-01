use analyze::AnalysisResult;
use mongodb::{options::ClientOptions, Client};
use schemas::answer::FormAnswer;
use schemas::form::Form;

mod analyze;
mod listener;
mod schemas;

const DB_URI: &str = "mongodb://127.0.0.1:27017";
const DB_NAME: &str = "former";
const COLLECTION_FORMS: &str = "form";
const COLLECTION_ANSWERS: &str = "form_answer";
// const COLLECTION_ANALYSIS: &str = "form_analysis";

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let mut client_options = ClientOptions::parse(DB_URI).await?;
    client_options.app_name = Some("answer_aggregator".to_string());

    let client = Client::with_options(client_options)?;

    let database = client.database(DB_NAME);
    let answers_collection: mongodb::Collection<FormAnswer> =
        database.collection(COLLECTION_ANSWERS);
    let forms_collection: mongodb::Collection<Form> = database.collection(COLLECTION_FORMS);

    let _ = listener::listen(process_request).await;
    Ok(())
}
async fn process_request(req: listener::RequestJSON) -> AnalysisResult {
    // Example logic, replace with actual checks and analysis
    // Simulate fetching data and performing analysis
    let analysis = vec![0.1, 0.5, 0.9]; // This would be your actual analysis results

    if analysis.is_empty() {
        AnalysisResult::NoAnswersFound
    } else {
        AnalysisResult::Success(analysis)
    }
}

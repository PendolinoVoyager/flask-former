use bson::oid::ObjectId;
use chrono::Utc;
use futures::stream::StreamExt;
use mongodb::{options::ClientOptions, Client};
use schemas::answer::FormAnswer;
use schemas::components::{Component, TextComponent};
use schemas::form::Form;

const DB_URI: &str = "mongodb://127.0.0.1:27017";
const DB_NAME: &str = "former";
const COLLECTION_FORMS: &str = "form";
const COLLECTION_ANSWERS: &str = "form_answer";
const COLLECTION_ANALYSIS: &str = "form_analysis";

mod schemas;
#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let client_uri = DB_URI;
    let mut client_options = ClientOptions::parse(client_uri).await?;
    client_options.app_name = Some("FormApp".to_string());

    let client = Client::with_options(client_options)?;

    let database = client.database(DB_NAME);
    let forms_collection = database.collection::<Form>(COLLECTION_FORMS);
    let answers_collection = database.collection::<FormAnswer>(COLLECTION_ANSWERS);

    // Example: Fetch all forms
    let mut cursor = forms_collection.find(None, None).await?;
    while let Some(form) = cursor.next().await {
        println!("{:?}", form);
    }
    Ok(())
}

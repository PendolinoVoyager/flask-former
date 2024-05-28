const DB_URL: &str = "mongodb://127.0.0.1:27017/former?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";
const COLLECTION_FORMS: &str = "form";
const COLLECTION_ANSWERS: &str = "form_answer";
const COLLECTION_ANALYSIS: &str = "form_analysis";

mod schemas;

fn main() {
    println!("Hello, world!");
}

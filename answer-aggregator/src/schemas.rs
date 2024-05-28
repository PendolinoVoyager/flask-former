use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct FormAnswer {
    form_id: mongodb::bson::Uuid,
    created_at: mongodb::bson::Timestamp,
    answer: mongodb::bson::Array,
}

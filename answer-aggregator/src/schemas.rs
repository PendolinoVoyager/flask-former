pub mod components {
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct TextComponent {
        pub _cls: String,
        pub label: String,
        pub required: bool,
        pub default_value: Option<String>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct DateComponent {
        _cls: String,
        label: String,
        required: bool,
        default_value: Option<bson::DateTime>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct NumberComponent {
        _cls: String,
        label: String,
        required: bool,
        is_integer: bool,
        default_value: Option<f64>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct DateTimeComponent {
        _cls: String,
        label: String,
        required: bool,
        default_value: Option<bson::DateTime>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct TimeComponent {
        _cls: String,
        label: String,
        required: bool,
        default_value: Option<String>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct CheckboxComponent {
        _cls: String,
        label: String,
        required: bool,
        choices: Vec<String>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct RadioComponent {
        _cls: String,
        label: String,
        required: bool,
        choices: Vec<String>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    #[serde(untagged)]
    pub enum Component {
        Text(TextComponent),
        Date(DateComponent),
        Number(NumberComponent),
        DateTime(DateTimeComponent),
        Time(TimeComponent),
        Checkbox(CheckboxComponent),
        Radio(RadioComponent),
    }
}

pub mod answer {
    use bson::oid::ObjectId;

    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct FormAnswer {
        pub _id: ObjectId,
        pub form: ObjectId,
        pub answers: Vec<bson::Bson>,
        pub submitted_at: bson::DateTime,
    }
}

pub mod form {
    use bson::oid::ObjectId;
    use serde::{Deserialize, Serialize};
    #[derive(Debug, Serialize, Deserialize)]
    pub struct Form {
        pub _id: ObjectId,
        pub name: String,
        pub description: Option<String>,
        pub image: String,
        pub created: i64,
        pub components: Vec<super::components::Component>,
        pub key: Option<String>,
    }
}
// Example: Insert a form
// let form = Form {
//     _id: ObjectId::new(),
//     name: "Sample Form".to_string(),
//     description: "".to_string(),
//     image: "placeholder.png".to_string(),
//     created: Utc::now().timestamp(),
//     components: vec![
//         Component::Text(TextComponent {
//             _cls: "TextComponent".to_string(),
//             label: "New Text".to_string(),
//             required: true,
//             default_value: Some("".to_string()),
//         }),
//         // Add other components as needed
//     ],
//     key: "some_key".to_string(),
// };

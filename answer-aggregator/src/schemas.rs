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
        pub _cls: String,
        pub label: String,
        pub required: bool,
        pub default_value: Option<bson::DateTime>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct NumberComponent {
        pub _cls: String,
        pub label: String,
        pub required: bool,
        pub is_integer: bool,
        pub default_value: Option<f64>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct DateTimeComponent {
        pub _cls: String,
        pub label: String,
        pub required: bool,
        pub default_value: Option<bson::DateTime>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct TimeComponent {
        pub _cls: String,
        pub label: String,
        pub required: bool,
        pub default_value: Option<String>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct CheckboxComponent {
        pub _cls: String,
        pub label: String,
        pub required: bool,
        pub choices: Vec<String>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct RadioComponent {
        pub _cls: String,
        pub label: String,
        pub required: bool,
        pub choices: Vec<String>,
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

pub mod analysis {
    use crate::analyze::criteria::Criteria;
    use bson::oid::ObjectId;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    pub struct AnalysisRequest {
        pub criteria: Criteria,
        pub component_index: usize,
    }
    use std::fmt;
    impl fmt::Debug for AnalysisRequest {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            f.debug_struct("AnalysisRequest")
                .field("component_index", &self.component_index)
                .field("criteria", &"Dynamic Analyzer Trait Object")
                .finish()
        }
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct FormAnalysis {
        pub _id: ObjectId,
        pub form: ObjectId,
        pub answers_included: usize,
        pub analysis_requests: Vec<AnalysisRequest>,
        pub by_component: Vec<f64>,
    }
}

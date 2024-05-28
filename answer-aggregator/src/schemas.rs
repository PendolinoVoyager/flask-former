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
    use bson::{oid::ObjectId, Bson};

    use serde::{Deserialize, Serialize};

    use super::{analysis::AnalysisRequest, criteria::Criteria};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct FormAnswer {
        pub _id: ObjectId,
        pub form: ObjectId,
        pub answers: Vec<bson::Bson>,
        pub submitted_at: bson::DateTime,
    }

    impl FormAnswer {
        pub fn analyze(&self, analysis_requests: Vec<AnalysisRequest>) -> Vec<bool> {
            analysis_requests
                .iter()
                .map(|request| {
                    // Answer is the factual answer. We don't know what it refers to.
                    // Theres a need to somehow get the hold of ComponentType and
                    // Implement the method on it.
                    // The criteria method should return option to prevent invalid criteria
                    let answer = &self.answers[request.component_index];
                    match request.criteria {
                        Criteria::Equals => {
                            if let Bson::String(ref ans) = answer {
                                request.equals(ans)
                            } else {
                                false
                            }
                        }
                        Criteria::LessThan => {
                            if let Bson::Double(ans) = answer {
                                request.less_than(ans)
                            } else {
                                false
                            }
                        }
                        Criteria::GreaterThan => {
                            if let Bson::Double(ans) = answer {
                                request.greater_than(ans)
                            } else {
                                false
                            }
                        }
                        Criteria::StringMatch => {
                            if let Bson::String(ref ans) = answer {
                                request.string_match(&Regex::new(ans).unwrap())
                            } else {
                                false
                            }
                        }
                        Criteria::OptionChoice => {
                            if let Bson::Int32(ans) = answer {
                                request.option_choice(*ans as usize)
                            } else {
                                false
                            }
                        }
                    }
                })
                .collect()
        }
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
    use bson::oid::ObjectId;
    use serde::{Deserialize, Serialize};

    use super::criteria::Criteria;

    #[derive(Debug, Serialize, Deserialize)]
    pub struct AnalysisRequest {
        pub criteria: Criteria,
        pub component_index: usize,
    }
    #[derive(Debug, Serialize, Deserialize)]
    pub struct FormAnalysis {
        pub _id: ObjectId,
        pub form: ObjectId,
        pub answers_included: usize,
        pub created: i64,
        pub updated: u64,
        pub analysis_request: Vec<AnalysisRequest>,
        pub by_component: Vec<f64>,
    }
}

pub mod criteria {
    use bson::Regex;
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize)]
    pub enum Criteria {
        Equals,
        LessThan,
        GreaterThan,
        StringMatch,
        OptionChoice,
    }
    pub trait Equals {
        fn equals<T>(&self, value: T) -> bool;
    }

    pub trait LessThan {
        fn less_than<T>(&self, value: T) -> bool;
    }

    pub trait GreaterThan {
        fn greater_than<T>(&self, value: T) -> bool;
    }

    pub trait StringMatch {
        fn string_match(&self, value: &Regex) -> bool;
    }

    pub trait OptionChoice {
        fn option_choice(&self, index: usize) -> bool;
    }
}

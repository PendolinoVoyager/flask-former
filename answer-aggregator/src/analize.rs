use criteria::Analyzer;

use crate::schemas::{analysis::AnalysisRequest, answer::FormAnswer};

pub mod criteria {
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize)]
    #[serde(tag = "type")]
    pub enum Criteria {
        Equals { value: String },
        LessThan { threshold: f64 },
        GreaterThan { threshold: f64 },
        StringMatch { pattern: String },
        OptionChoice { choice: String },
    }
    pub trait Analyzer {
        fn analyze(&self, val: &str) -> bool;
    }

    impl Analyzer for Criteria {
        fn analyze(&self, val: &str) -> bool {
            match self {
                Criteria::Equals { value } => val == value,
                Criteria::LessThan { threshold } => {
                    val.parse::<f64>().unwrap_or_default() < *threshold
                }
                Criteria::GreaterThan { threshold } => {
                    val.parse::<f64>().unwrap_or_default() > *threshold
                }
                Criteria::StringMatch { pattern } => val.contains(pattern),
                Criteria::OptionChoice { choice } => val == choice,
            }
        }
    }
}

impl FormAnswer {
    pub fn analyze(&self, requests: &[AnalysisRequest]) -> Vec<bool> {
        requests
            .iter()
            .map(|request| {
                let component_index = request.component_index;
                let answer = &self.answers[component_index].to_string();
                let criteria = &request.criteria;
                criteria.analyze(answer)
            })
            .collect()
    }
}

#![allow(unused)]
use criteria::Analyzer;
use serde::{Deserialize, Serialize};

use crate::schemas::{analysis::AnalysisRequest, answer::FormAnswer, form::Form};
#[derive(Debug, Serialize, Deserialize)]
pub enum AnalysisResult {
    Success(Vec<f64>),
    NoAnswersFound,
    NoFormsFound,
    BadRequest(String), // Optionally include more info about what was bad
}
pub mod criteria {
    use chrono::{NaiveDate, NaiveTime};
    use regex::Regex;
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize)]
    #[serde(tag = "type")]
    pub enum Criteria {
        Equals { value: String },
        LessThan { value: f64 },
        GreaterThan { value: f64 },
        DateBefore { value: String },
        TimeBefore { value: String },
        RegexMatch { value: String },
        OptionChoice { value: String },
    }

    pub trait Analyzer {
        fn analyze(&self, val: &str) -> bool;
    }

    impl Analyzer for Criteria {
        fn analyze(&self, val: &str) -> bool {
            match self {
                Criteria::Equals { value } => val == value,
                Criteria::LessThan { value } => val.parse::<f64>().unwrap_or_default() < *value,
                Criteria::GreaterThan { value } => val.parse::<f64>().unwrap_or_default() > *value,
                Criteria::RegexMatch { value } => Regex::new(value)
                    .map(|re| re.is_match(val))
                    .unwrap_or(false),
                Criteria::OptionChoice { value } => val == value,
                Criteria::DateBefore { value } => {
                    let date = NaiveDate::parse_from_str(value, "%Y-%m-%d");
                    let val_date = NaiveDate::parse_from_str(val, "%Y-%m-%d");
                    match (val_date, date) {
                        (Ok(vd), Ok(d)) => vd < d,
                        _ => false,
                    }
                }
                Criteria::TimeBefore { value } => {
                    let time = NaiveTime::parse_from_str(value, "%H:%M:%S");
                    let val_time = NaiveTime::parse_from_str(val, "%H:%M:%S");
                    match (val_time, time) {
                        (Ok(vt), Ok(t)) => vt < t,
                        _ => false,
                    }
                }
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
    pub fn analyze_single(&self, request: &AnalysisRequest) -> bool {
        let answer = &self.answers[request.component_index].to_string();
        request.criteria.analyze(answer)
    }
}

impl Form {
    pub fn analyze(&self, answers: &[FormAnswer], requests: &[AnalysisRequest]) -> Vec<f64> {
        requests
            .iter()
            .map(|request| {
                let count = answers
                    .iter()
                    .filter(|answer| answer.analyze_single(request))
                    .count();

                let percentage = if answers.is_empty() {
                    0.0
                } else {
                    (count as f64 / answers.len() as f64) * 100.0
                };

                percentage
            })
            .collect()
    }
}

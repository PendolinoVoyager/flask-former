# Former app documentation 
# 1. Introduction

This documentation provides an in-depth guide to understanding, setting up, and using  the Google-Forms-like application named Former or Flask-Former. Initially conceived as an assignment, this project has evolved into an attempt at a comprehensive system that facilitates anonymous form creation, sharing, and analytics. The following sections will delve into the technical aspects, design choices, technologies, and potential pitfalls encountered during the development of this application.
## Overview of the System

The application is composed of three main services: the Flask server, the Next.js frontend server, and the Rust analytics server. Each service plays a crucial role in ensuring the seamless functionality of the app. Here's a brief overview of each service and their interconnections:

### Flask Backend Server
The Flask server acts as the backbone of the application, coordinating between different services and managing the core logic. It operates as a model-controller system without a view, focusing on handling API requests, managing form submissions, and interfacing with the MongoDB database. The Flask server ensures that data flows smoothly between the frontend and backend, providing a reliable API for the Next.js frontend server to interact with.
### Next.js Frontend Server
The Next.js frontend server serves as the view of the application, offering a user-friendly interface for creating, managing, and analyzing forms. It relies entirely on the Flask server's API endpoints to perform operations such as fetching form data, submitting responses, and retrieving analytics. By leveraging server-side rendering and static site generation, the Next.js server ensures fast and efficient delivery of content to users.
Rust Analytics Server
### Rust Analytics Server
The Rust analytics server is a specialized component designed for high-performance data processing. It can filter responses to forms based on various criteria such as "Equals", "LessThan", etc., essentially functioning as a simplified SQL engine using JSON. This server handles the computationally intensive tasks of data analysis, allowing the Flask server to focus on coordinating and managing data flow without being bogged down by heavy processing. It's worth noting here that it uses raw TCP sockets to handle communication, not bogging it down with needless HTTP headers and such.

# 2. Setup and Installation
## Requirements

Before you begin, ensure you have the following installed on your system:

- **Node.js** version 20.0.0+ with npm
- **Python** with the following packages:
  - flask
  - flask-cors
  - dotenv
  - mongoengine
  - bcrypt
  - slugify

- **Cargo** (Rust package manager)
- **Docker** (to run MongoDB)
- **Choice of OS**
    - Linux: App created with this system in mind, the bash scripts work out of the box.
    - MacOS: Should also work as long as dependencies are met.
    - Windows: Bash scripts aren't necessary to run this app but it will be a hassle, still, all tools          used are open source and thus available on Windows.
## Quick Start

Follow these steps to set up and run the application:

### 1. Clone the Repository

```bash
git clone https://github.com/PendolinoVoyager/flask-former.git
cd flask-former
```
### 2. Install Node.js Dependencies
```bash
cd former-frontend
npm install
cd ..
```
### 3. Set Up Python Environment
Install the required Python packages:
```bash
pip install flask flask-cors dotenv mongoengine bcrypt slugify
```
### 4. Install Rust Dependencies
Ensure you have Cargo installed, then build the Rust server:

```bash

cd answer-aggregator
cargo build --release
cd ..
```

### 5. Start MongoDB

Run MongoDB in a Docker container:

```bash
./run_db.sh
```
This script conviniently set's up the database with the same name as in .env file.
### 6. Start the Application

Run the main bash script to start all services:

```bash
./start_app.sh
```
or for release mode:

```bash
./start_release.sh
```
Alternatively, start the 3 servers with:
```bash
    cd former-frontent
    npm run dev
    //In another shell
    cd answer-aggregator
    cargo run
    //Yet another shell, why not
    cd server
    ./run.sh
```
## Scripts
    start_app.sh

This script sets up the environment and starts the Flask server, Next.js frontend server, and Rust analytics server in development mode.
start_release.sh

    start_release.sh
This script sets up the environment and starts the Flask server, Next.js frontend server, and Rust analytics server in production mode.


# 3. Service Details - Flask Server
## run.sh script
The run.sh script is a Bash script designed to set up and run the Flask application. This script ensures that all necessary environment variables are loaded, dependencies are installed, and the Flask app is started. Here's a detailed explanation of each part of the script:
```bash
#!/bin/bash

# Get environment variables
source .env

# Function to install a package if not already installed
install_package_if_not_installed() {
    package=$1
    hasPackage=$(pip list | grep $package)
    if [ -z "$hasPackage" ]; then
        echo "$package not found, installing..."
        pip install $package
        if [ $? -ne 0 ]; then
            echo "Failed to install $package, exiting..."
            exit 1
        fi
    fi
}

# Check if Flask is installed and install it if not
install_package_if_not_installed "Flask"

# Install all dependencies from deps.txt
while IFS= read -r package; do
    install_package_if_not_installed "$package"
done < deps.txt

# Run the Flask app using the run.py script
python ./app/run.py


# Run the Flask app using the run.py script
python ./app/run.py
```
---

####  Environment Variables:

The script begins by sourcing the .env file to load any environment variables necessary for the application.

```bash
source .env
```
They are used all over the flask application and are loaded into constants in globals.py file.
#### Function to Install Packages:

The **install_package_if_not_installed** function checks if a given package is installed using pip list. If the package is not found, it installs the package using pip install.
If the installation fails, the script exits with an error message.

```bash
install_package_if_not_installed() {
    package=$1
    hasPackage=$(pip list | grep $package)
    if [ -z "$hasPackage" ]; then
        echo "$package not found, installing..."
        pip install $package
        if [ $? -ne 0 ]; then
            echo "Failed to install $package, exiting..."
            exit 1
        fi
    fi
}
```
#### Check and Install Flask:
The script explicitly checks for Flask and installs it if it is not already installed.

```bash
install_package_if_not_installed "Flask"
```

#### Install Dependencies:

The script reads through a deps.txt file, which contains a list of required Python packages, and installs each one if it is not already installed.

```bash
while IFS= read -r package; do
    install_package_if_not_installed "$package"
done < deps.txt
```
#### Run the Flask Application:

Finally, the script runs the Flask application using the run.py script located in the app directory.

```bash
python ./app/run.py
```
#### Additional Notes

*This script could have been and should be made in Python to accomodate systems without bash shell. It fits perfectly as such scripting is one of the advantages of Python.*

## Directory structure
The directory structure of the Flask server is organized to maintain a clean and modular codebase. Below is a detailed explanation of the structure and the purpose of each file and directory:
```
.
├── app
│   ├── aggregator
│   │   ├── client.py
│   │   └── extension.py
│   ├── aggregatorController.py
│   ├── answerController.py
│   ├── db
│   │   ├── Answer.py
│   │   ├── Component.py
│   │   ├── db_init.py
│   │   └── Form.py
│   ├── formController.py
│   ├── globals.py
│   ├── Hasher.py
│   ├── helpers.py
│   ├── __init__.py
│   ├── router.py
│   └── run.py
├── deps.txt
├── package-lock.json
├── public
└── run.sh
```
#### 1. app Directory:
    This is the main directory for the Flask application code.

#### 2. aggregator Directory:
    Contains modules related to data aggregation / analysis. It server as a direct connection to Rust         Analysis Server.
    client.py and extension.py handle client-side and extension-related logic for aggregation.

#### 3. Controllers:
    aggregatorController.py: Manages the requests for data aggregation, a gateway between a user's           request and Rust's analysis service. 
    answerController.py: Handles form responses, including submission and retrieval.
    formController.py: Manages form creation, retrieval, and deletion.

#### 4. db Directory:
    Contains database models and initialization scripts.
    Answer.py: Defines the schema for form answers.
    Component.py: Defines the schema for form components. It contains a factory to create components         from key-word arguments and types.
    db_init.py: Initializes the database connection.
    Form.py: Defines the schema for forms.

#### 5. Helpers and Utilities:
    globals.py: Contains global variables and configurations from .env file.
    Hasher.py: Manages hashing for secure data handling (form keys).
    helpers.py: Contains utility functions, like @error_wrapper decorator to prevent the app from            crashing.

#### 6. Initialization and Routing:
    init.py: Initializes the Flask application. Containts create_app function.
    router.py: Manages the routing of API endpoints. The blueprints for each route are defined here.
    run.py: The entry point for running the Flask server. Creates app and mounts routes.

#### 7. Configuration and Dependencies:
    deps.txt: A text file listing project dependencies (Python packages).

#### 8. Public Directory:
    Contains static files such as images served from Flask server.

#### 9. run.sh:
    A script for setting up the environment and running the Flask application.

#### Root Directory

The root of the app contains the run.sh script for running the Flask application and the main Flask app within the app directory. This structured approach helps in maintaining the codebase, making it easier to manage and scale as needed.



## Database and schemas
The Flask HTTP server serves as the backbone of the application, acting as a coordinator between different services. It is responsible for handling API requests, managing form submissions, and interfacing with the MongoDB database. The server follows a simple Model-Controller (no View) architecture, ensuring that data flows smoothly between the frontend and backend.
The core MongoDB schemas - namely Form, Form_Answer and Component are defined here and work through MongoEngine. <Explain MongoEngine> 
### Mongoengine Overview

MongoEngine is an Object-Document Mapper (ODM) for working with MongoDB from Python. It provides a high-level, user-friendly API for defining schemas, querying the database, and managing data. Unlike traditional SQL databases that use tables, MongoDB stores data in flexible, JSON-like documents, which makes MongoEngine a natural fit for working with MongoDB in Python applications.
#### Key Features
- Schema Definition: MongoEngine allows you to define the schema for your documents using Python classes. Each class represents a collection in MongoDB, and each class attribute corresponds to a field in the document.
- Validation: It includes built-in validation for data types and constraints, ensuring that the data stored in MongoDB adheres to the defined schema.
- Querying: MongoEngine provides a powerful and intuitive API for querying the database, allowing for complex queries using familiar Python syntax.
- Relationships: It supports document references and embedded documents, making it easy to define relationships between different collections.
- Integration: MongoEngine integrates seamlessly with Flask, providing extensions and utilities to simplify the development of Flask applications with MongoDB.

## MongoDB document schemas
### Form
```python
class Form(Document):
    name = StringField(required=True, max_length=200)
    description = StringField(max_length=500)
    image = StringField(max_length=200)
    created = IntField(default=time())
    components = EmbeddedDocumentListField(Component, 
                                            max_length=99,
                                            min_length=1,
                                            required=True,
                                            polymorphic=True)
    key = StringField(max_length=64)
    
    # Methods...
```
The Form class is a MongoEngine Document that represents a form in the application. This schema defines various attributes of a form, such as its name, description, components, and other metadata. Here's a detailed breakdown of each part of the schema:
- Class Definition

```python
class Form(Document):
```
The Form class inherits from mongoengine.Document, making it a MongoDB document that can be stored in and retrieved from a MongoDB collection.
Fields

```python
    name = StringField(required=True, max_length=200)
```
- name: A required string field with a maximum length of 200 characters. This field stores the name of the form.

```python
    description = StringField(max_length=500)
```
- description: An optional string field with a maximum length of 500 characters. This field stores a description of the form.

```python
    image = StringField(max_length=200)
```
- image: An optional string field with a maximum length of 200 characters. This field stores the URL or path of an image associated with the form.

```python
    created = IntField(default=time())
```
- created: An integer field that stores the creation timestamp of the form. It defaults to the current time when the form is created.

```python

    components = EmbeddedDocumentListField(Component, 
                                            max_length=99,
                                            min_length=1,
                                            required=True,
                                            polymorphic=True)
```
- components: An embedded document list field that contains a list of Component objects. This field is required and must contain at least one component and no more than 99. It is polymorphic, meaning it can store different types of components.

```python
key = StringField(max_length=64)
```
- key: An optional string field with a maximum length of 64 characters. This field stores a hashed key for the form, which can be used for security or identification purposes. 

#### Methods
- to_json

```python

    def to_json(self, *args, **kwargs):
        retval = {
            "id": self.id.__str__(),
            "name": self.name,
            "description": self.description,
            "image": self.image,
            "created": self.created,
            "components": [component.JSON_serialize() for component in self.components]
        }
        return retval
```
This method converts the form object into a JSON-serializable dictionary. It includes the form's ID, name, description, image, creation timestamp, and components (each component is serialized using its own JSON_serialize method).

- from_json

```python

    @staticmethod
    def from_json(body):
        if not body:
            raise ValueError("form is required")
        if not body.get('name'):
            raise ValueError("name is required")
        if not body.get('components') or not len(body.get('components')):
            raise ValueError("components are required")

        components = []
        for component in body['components']:
            if component['type'] not in AVAILABLE_COMPONENTS:
                raise ValueError(f"invalid component type: {component['type']}")
            components.append(ComponentFactory.from_type(component['type'], **component))

        formDict = {
            "name": body['name'],
            "image": 'placeholder.png',
            "components": components
        }
        if "description" in body:
            formDict["description"] = body["description"]
        if 'image' in body:
            formDict["image"] = save_file(body['image'])
        if "key" in body:
            formDict['key'] = Hasher.hash(body['key'])

        form = Form(**formDict)
        return form
```
This static method constructs a Form object from a JSON request body. It performs the following steps:
- Validates that the body contains the required fields (name and components).
- Creates a list of components using the ComponentFactory based on the component type.
- Constructs a dictionary (formDict) with the form data, including default values for optional fields like image.
    - If an image is provided in the body, it processes and saves the image file.
    - If a key is provided, it hashes the key using the Hasher utility.
    - Creates and returns a Form object using the constructed dictionary.

This schema design ensures that each form document in MongoDB adheres to a specific structure, making it easy to store, retrieve, and manipulate form data. The methods provided (to_json and from_json) facilitate the conversion between JSON and MongoEngine objects, streamlining the integration with web APIs and other components of the application.

### Component
The Component class and its derived classes represent different types of form components that can be embedded within a Form document. These components include text fields, checkboxes, radio buttons, number inputs, date pickers, time pickers, and datetime pickers. Here's a detailed breakdown of each part of the schema and its functionality:
Base Component Class

```python
class Component(EmbeddedDocument):
    meta = {'allow_inheritance': True}
    label = StringField(required=True, max_length=200)
    type = StringField(required=True, max_length=50)
    required = BooleanField(required=False, default=False)
    type = "abstract"
    def JSON_serialize(self):
        raise NotImplementedError("Method not implemented")
```
#### Component (Base Class):
-   meta = {'allow_inheritance': True}: Allows this class to be inherited by other component types.
-   label: A required string field that provides a label for the component.
-   type: A required string field that indicates the type of the component (e.g., text, checkbox).
-   required: An optional boolean field that specifies whether the component is required in the form.
-   type = "abstract": Sets a default type indicating that this is an abstract component.
-   JSON_serialize(): An abstract method that should be implemented by subclasses to serialize the component to JSON.

### Derived Component Classes

Each derived class represents a specific type of form component and implements the JSON_serialize method.
#### TextComponent

```python

class TextComponent(Component):
    type = "text"
    default_value = StringField(max_length=200)
    def __init__(self, **kwargs):
        super().__init__()
        self.label = kwargs.get('label')
        self.required = kwargs.get('required')
        self.default_value = kwargs.get('default_value')
    def JSON_serialize(self):
        return {
           "type": "text",
           "label": self.label,
           "default_value": self.default_value,
           "required": self.required
       }
```
TextComponent:
- Represents a text input field.
- default_value: An optional string field for the default value of the text input.
- JSON_serialize(): Serializes the component to a JSON object.

#### CheckboxComponent

```python

class CheckboxComponent(Component):
    type = "checkbox"
    choices = ListField(StringField(max_length=50), max_length=64)
    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self.label = kwargs.get('label')
        self.choices = kwargs.get('choices')
        self.required = kwargs.get('required', False)

    def JSON_serialize(self):
        return {
            "type": "checkbox",
            "label": self.label,
            "choices": self.choices,
            "required": self.required
        }
```
CheckboxComponent: 
- Represents a checkbox input with multiple choices.
- choices: A list of string fields representing the checkbox options.
- JSON_serialize(): Serializes the component to a JSON object.

#### RadioComponent

```python

class RadioComponent(Component):
    type = "radio"
    choices = ListField(StringField(max_length=50), max_length=64)

    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self.label = kwargs.get('label')
        self.choices = kwargs.get('choices')
        self.required = kwargs.get('required', False)

    def JSON_serialize(self):
        return {
            "type": "radio",
            "label": self.label,
            "choices": self.choices,
            "required": self.required
        }
```
RadioComponent:
- Represents a radio button input with multiple choices but only one selection.
- choices: A list of string fields representing the radio button options.
- JSON_serialize(): Serializes the component to a JSON object.

#### NumberComponent

```python

class NumberComponent(Component):
    type = "number"
    min = FloatField()
    max = FloatField()
    is_integer = BooleanField()
    default_value = FloatField()
    def __init__(self, **kwargs):
        super().__init__( **kwargs)
        self.label = kwargs.get('label')
        self.min = kwargs.get('min')
        self.max = kwargs.get('max')
        self.required = kwargs.get('required', False)
        self.is_integer = kwargs.get('is_integer', False)
        self.default_value = kwargs.get('default_value')
    def JSON_serialize(self):
        return {
            "type": "number",
            "label": self.label,
            "default_value": self.default_value,
            "required": self.required,
            "min": self.min,
            "max": self.max,
            "is_integer": self.is_integer
        }
```
NumberComponent:
- Represents a numeric input field.
- min: An optional float field for the minimum value.
- max: An optional float field for the maximum value.
- is_integer: An optional boolean field indicating whether the number should be an integer.
- default_value: An optional float field for the default value.
- JSON_serialize(): Serializes the component to a JSON object.

#### DateComponent

```python

class DateComponent(Component):
    type = "date"
    default_value = DateField()
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.required = kwargs.get('required', False)
        self.label = kwargs.get('label')
        self.default_value = self.validate_date(kwargs.get('default_value'))

    @staticmethod
    def validate_date(value):
        if isinstance(value, int):
            return datetime.datetime.fromtimestamp(value).date()
        elif isinstance(value, str):
            try:
                return datetime.datetime.strptime(value, '%Y-%m-%d').date()
            except ValueError:
                return None
        else:
            return None

    def JSON_serialize(self):
        return {
            "type": "date",
            "label": self.label,
            "default_value": self.default_value.isoformat() if self.default_value else None,
            "required": self.required,
        }
```
DateComponent:
- Represents a date input field.
- default_value: An optional date field for the default value.
- validate_date(): A static method to validate and convert date values.
- JSON_serialize(): Serializes the component to a JSON object.

#### TimeComponent

```python

class TimeComponent(Component):
    type = "time"
    default_value = StringField()  # Default value in HH:MM format

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.label = kwargs.get('label')
        self.default_value = self.validate_time(kwargs.get('default_value'))
        self.required = kwargs.get('required', False)

    @staticmethod
    def validate_time(value):
        if value is None: return None
        if isinstance(value, str):
            try:
                datetime.datetime.strptime(value, '%H:%M')
                return value
            except ValueError:
                raise ValueError("Invalid time format, must be in HH:MM format")
        else:
            raise ValueError("Invalid time value, must be a string in HH:MM format")
    def JSON_serialize(self):
        return {
            "type": "time",
            "label": self.label,
            "default_value": self.default_value,
            "required": self.required,
        }
```
TimeComponent:
- Represents a time input field.
- default_value: An optional string field for the default value in HH
format.
- validate_time(): A static method to validate and convert time values.
- JSON_serialize(): Serializes the component to a JSON object.

#### DateTimeComponent

```python

class DateTimeComponent(Component):
    type = "datetime"
    default_value = DateTimeField()

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.required = kwargs.get('required', False)
        self.label = kwargs.get('label')
        self.default_value = self.validate_datetime(kwargs.get('default_value'))

    @staticmethod
    def validate_datetime(value):
        if isinstance(value, int):
            return datetime.datetime.fromtimestamp(value)
        elif isinstance(value, str):
            try:
                return datetime.datetime.strptime(value, '%Y-%m-%dT%H:%M')
            except ValueError:
                raise ValueError("Invalid datetime string format, expected YYYY-MM-DDTHH:MM:SS")
        else:
            return None

    def JSON_serialize(self):
        return {
            "type": "datetime",
            "label": self.label,
            "default_value": self.default_value.isoformat() if self.default_value else None,
            "required": self.required,
        }
```
DateTimeComponent:
- Represents a datetime input field.
- default_value: An optional datetime field for the default value.
- validate_datetime(): A static method to validate and convert datetime values.
- JSON_serialize(): Serializes the component to a JSON object.

### Component Factory

The ComponentFactory class is responsible for creating instances of the different component types based on the provided type.

```python

class ComponentFactory:
    REQUIRED_FIELDS = ["label"]
    @staticmethod
    def from_type(self, type, **kwargs):
        for field in ComponentFactory.REQUIRED_FIELDS:
            if field not in kwargs:
                raise ValueError(f"Field {field
      match type:
        case "text":
            return TextComponent(**kwargs)
        case "number": #And so on...
```
## Form Answer
The FormAnswer class and the AnswerValidator class are designed to manage and validate responses to forms. Here is a detailed breakdown of each part of the schema and its functionality:
FormAnswer Class

The FormAnswer class represents a user's response to a form, including references to the form and the submitted answers.

```python

class FormAnswer(Document):
    form = ReferenceField('Form', required=True)
    answers = ListField()  # Flexible storage for any answer type
    submitted_at = DateTimeField(default=datetime.datetime.now(datetime.UTC))

    def to_json(self, *args, **kwargs):
        return {
            "form_id": str(self.form.id),
            "answers": self.answers,
            "submitted_at": str(self.submitted_at.isoformat())
        }
```
- form: A required reference field linking the response to a specific Form document.
- answers: A list field that stores the user's answers to the form's components. This field is flexible to accommodate various answer types.
- submitted_at: A datetime field that records the timestamp when the form was submitted. It defaults to the current time in UTC.

#### to_json Method

The to_json method converts the FormAnswer document into a JSON-serializable dictionary.

- form_id: Converts the form's ObjectId to a string.
- answers: Directly includes the list of answers.
- submitted_at: Formats the submission timestamp as an ISO 8601 string.

### AnswerValidator Class

The AnswerValidator class is responsible for validating the answers submitted for a form. It ensures that the answers match the expected components and adhere to any specified constraints.

```python

class AnswerValidator:
    def __init__(self, form, answers):
        self.form = form
        self.answers = answers

    def validate(self):
        if len(self.answers) != len(self.form.components):
            raise ValueError("The number of answers must match the number of components.")
        for answer, component in zip(self.answers, self.form.components):
            self.validate_answer(answer, component)

    def validate_answer(self, answer, component):
        if component.required and answer is None:
            raise ValueError(f"Answer for {component.label} ({component.type}) is required.")
        
        if component.type == 'number':
            if isinstance(answer, (int, float)):
                if 'min' in component and answer < component.min:
                    raise ValueError(f"Number is below the minimum allowed value of {component.min}.")
                if 'max' in component and answer > component.max:
                    raise ValueError(f"Number exceeds the maximum allowed value of {component.max}.")
            else:
                raise ValueError(f"Invalid number format for {component.label}.")
        
        elif component.type == 'checkbox' or component.type == 'radio':
            if not all(opt in component.choices for opt in answer):
                raise ValueError(f"Invalid option selected for {component.label}.")
        
        elif component.type == 'text':
            if not isinstance(answer, str):
                raise ValueError(f"Invalid text format for {component.label}.")
        
        elif component.type == 'date':
            if not isinstance(answer, datetime.date):
                raise ValueError(f"Invalid date format for {component.label}.")
        
        elif component.type == 'time':
            if not isinstance(answer, str):
                raise ValueError(f"Invalid time format for {component.label}.")
            try:
                datetime.datetime.strptime(answer, '%H:%M')
            except ValueError:
                raise ValueError(f"Invalid time format, must be HH:MM for {component.label}.")
        
        elif component.type == 'datetime':
            if not isinstance(answer, datetime.datetime):
                raise ValueError(f"Invalid datetime format for {component.label}.")
            try:
                datetime.datetime.strptime(answer, '%Y-%m-%dT%H:%M')
            except ValueError:
                raise ValueError(f"Invalid datetime format, must be YYYY-MM-DDTHH:MM for {component.label}.")

    def is_valid(self):
        try:
            self.validate()
            return True
        except ValueError:
            return False
```
#### init Method

The initializer method sets up the validator with the form and the answers to be validated.

- form: The form against which the answers are to be validated.
- answers: The list of answers submitted for the form.

#### validate Method

The validate method performs the validation process:

- Number of Answers: Checks that the number of answers matches the number of form components.
- Component Validation: Iterates over each answer and corresponding component to validate them using the validate_answer method.

### validate_answer Method

The validate_answer method validates an individual answer against the corresponding component:

- Required Field: Ensures that required components have an answer.
- Number Component: Validates numeric answers, checking for type and value constraints (min and max).
- Checkbox and Radio Components: Ensures that the selected options are valid choices.
- Text Component: Validates that the answer is a string.
- Date Component: Validates that the answer is a valid date.
- Time Component: Validates that the answer is a valid time string in HH
format.
- DateTime Component: Validates that the answer is a valid datetime string in YYYY-MM-DDTHH
format.

### is_valid Method

The is_valid method attempts to validate the answers and returns True if valid, otherwise catches the ValueError and returns False.

## Model-Controller architecture.

The Model-Controller architecture in this application separates the concerns of data management and business logic (handled by Models and Controllers, respectively) from the routing and HTTP request handling (managed by Flask Blueprints). This architecture promotes a clean and organized codebase, making it easier to maintain, extend, and test.
Models

Models represent the structure of the data and the business logic associated with it. In this application, models are defined using MongoEngine to interface with MongoDB. Key models include Form, Component, FormAnswer, and various specific component types like TextComponent, CheckboxComponent, etc.
Controllers

Controllers contain the business logic and interact with the models to handle incoming requests and perform necessary operations like retrieving, creating, updating, or deleting data. Controllers process the data, perform any necessary validation or computation, and return the results as Python dictionaries along with HTTP status codes.
Routes

Routes define the endpoints for the application. They are managed using Flask Blueprints, which group related routes together. Routes delegate the actual processing to controllers and then convert the controller's responses into JSON format for HTTP responses.

Here are the routes defined in the application:

```python
# Retrieve all forms
@v1_router_forms.route('/', methods=['GET'])
def get_all_forms():
    res, status = FormController.get_all_forms(request)
    return jsonify(res), status

# Retrieve a specific form by ID
@v1_router_forms.route('/<form_id>', methods=['GET'])
def get_form(form_id):
    res, status = FormController.get_form(request, form_id)

    return jsonify(res), status

# Create and publish a new form
@v1_router_forms.route('/', methods=['POST'])
def create_form():
    res, status = FormController.create_form(request)
    return jsonify(res), status

# Delete a specific form by ID
@v1_router_forms.route('/<form_id>', methods=['DELETE'])
def delete_form(form_id):
    res, status = FormController.delete_form(request, form_id)
    return jsonify(res), status

# Search for forms by criteria (e.g., name)
@v1_router_forms.route('/search', methods=['GET'])
def search_forms():
    res, status = FormController.search_forms(request)
    return jsonify(res), status



v1_router_answers = Blueprint('/api/v1/answers', __name__, url_prefix='/api/v1/answers')

@v1_router_answers.route('/<form_id>/answer', methods=['POST'])
def submit_answer(form_id):
    res, status = AnswerController.answerForm(request, form_id)
    return jsonify(res), status


v1_router_analysis = Blueprint('/api/v1/analysis', __name__, url_prefix='/api/v1/analysis')
@v1_router_analysis.route('/<form_id>/by_criteria', methods=["GET", "POST"])
def aggregate_by_criteria(form_id):
    res, status = AggregatorController.byCriteria(request, form_id)
    return jsonify(res), status
```

        Technical Aspects: MVC json api, with mongodb, pretty simple
        Design Choices - Separating db entities into separate directory: explain form, components, answers etc. leave space for ORM class code and fields.
        Technologies
        Pitfalls
    Next.js Frontend Server
        Technical Aspects
        Design Choices
        Technologies
        Pitfalls
    Rust Analytics Server
        Technical Aspects
        Design Choices
        Technologies
        Pitfalls

## Flow of a Request

1. HTTP Request: A client sends an HTTP request to one of the defined routes.
2. Routing: Flask routes the request to the appropriate view function based on the URL and HTTP method.
3. Controller Handling: The view function calls the corresponding controller method, passing the request object and any URL parameters.
4. Business Logic: The controller processes the request, interacts with the models, performs any necessary validation or computation, and prepares a response.
5. Response: The controller returns a Python dictionary and an HTTP status code. The view function converts this response to JSON format and sends it back to the client.

Example

For instance, when a GET request is made to /api/v1/forms/<form_id>:

1. The request is routed to get_form(form_id).
2. get_form(form_id) calls FormController.get_form(request, form_id).
3. FormController.get_form retrieves the form from the database, performs any necessary logic, and returns the result as a dictionary and status code.
4. The view function get_form(form_id) converts the result to JSON and returns it to the client.

## run.py - main function
The script is the entry point of the Flask application. It sets up the application, registers blueprints, and starts the server. Here are the key points:

### Import Statements:
Imports required modules and functions, including os for environment variables, globals for setting up the environment, and create_app for creating the Flask application.

```python

import os
import globals
from __init__ import create_app
```

### Create Flask Application:

Calls create_app() to initialize the Flask application and store it in the app variable for use in other modules.

```python
app = create_app()
```

### Register Blueprints:

Imports and registers blueprints for handling different routes.
The blueprints are registered after the application is initialized to ensure dependencies are met.

```python
if __name__ == '__main__':
    from router import v1_router_forms, v1_router_answers, v1_router_analysis
    app.register_blueprint(v1_router_forms)
    app.register_blueprint(v1_router_answers)
    app.register_blueprint(v1_router_analysis)
```
### Run the Application:

Starts the Flask server on the specified host and port from environment variables.

```python
    app.run(port=os.getenv('PORT'), host=os.getenv('HOST'))
```
## Key Points of create_app Function

The create_app function is responsible for setting up and configuring the Flask application. Here are the key points:

### Initialize Flask Application:
Creates a new Flask application instance.

```python

def create_app():
    app = Flask(__name__)
```
### Configuration:

Sets up configuration variables such as SECRET, ENV, and the static folder path.
### Configures logging.

```python
app.config["SECRET"] = os.getenv("SECRET")
app.config["ENV"] = os.getenv("ENV")
app.static_folder = f'../{os.getenv("STATIC_DIR")}'
logging.basicConfig(filename=os.getenv("LOG_FILE"))
```
### Set up CORS:

Configures Cross-Origin Resource Sharing (CORS) for specified routes.

```python

CORS(app, resources={r"/api/v1/*": {"origins": os.getenv("WEBSITE_HOST")}})
CORS(app, resources={r"/images/*": {"origins": os.getenv("WEBSITE_HOST")}})
```

### Database Connection:

Establishes a connection to the database using db_connect with the database URI from environment variables.
If the connection fails, the application exits.

```python

if db_connect(os.getenv('DB_URI')) is None:
    print("Cannot connect to database, exiting...")
    exit(1)
```
### Initialize Extensions:

Initializes any required extensions for the application.

```python

aggregator_extension = AggregatorClientExtension(app)
```
### Static File Route:

Defines a route for serving static image files.

```python

@app.route('/images/<path>', methods=['GET'])
def get_image(path):
    return app.send_static_file(path)
```
### Error Handlers:

Sets up error handlers for 404 errors and general exceptions.
Logs exceptions and provides appropriate JSON responses.

```python

@app.errorhandler(404)
def handle404(e):
    return jsonify({"status": "fail", "message": "route not found"}), 404

@app.errorhandler(Exception)
def handleException(e):
    if app.config['ENV'] == 'development':
        print(e)
    else:
        logging.critical(e)
    if isinstance(e, HTTPException):
        return jsonify({"status": "fail", "message": str(e)}), e.code
    return jsonify({"status": "fail", "message": "Internal server error"}), 500
```
## Connecting to Rust Analytics Server
The Rust Analysis Server Extension facilitates communication between the Flask application and an external Rust server responsible for data analysis. This extension uses socket programming to send analysis requests and receive responses. Here's a detailed breakdown of how it works:
### AggregatorClient Class

The AggregatorClient class handles the low-level socket communication with the Rust analysis server.

```python

import socket
import json

class AggregatorClient:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self):
        try:
            self.sock.connect((self.host, self.port))
        except ConnectionRefusedError:
            raise Exception("Aggregator service down")


    def close(self):
        self.sock.close()



    def send_analysis_request(self, form_uuid, analysis_requests):
        request_data = {
            'form': str(form_uuid),
            'analysis': analysis_requests
        }
        request_json = json.dumps(request_data).encode('utf-8')
        self.sock.sendall(request_json)
        response = self._receive_response()
        return response

    def _receive_response(self):
        response = self.sock.recv(1024).decode('utf-8')
        return response

```
#### Usage:
As it goes with sockets, a connection must be made. Then, 
The main method is send_analysis_request which is an API this class provides.
The close method isn't necessary to call since Rust server automatically closes its connection after sending data, but it's best practice to close it anyway.

### AggregatorClientExtension Class

The AggregatorClientExtension class integrates the AggregatorClient with the Flask application, ensuring that a client instance is available within the application context.

```python

from flask import current_app, _app_ctx_stack as stack
from .client import AggregatorClient
from globals import G_CONFIG

class AggregatorClientExtension:
    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)

    __init__ Method:
        Initializes the extension with the Flask application if provided.


    def init_app(self, app):
        app.teardown_appcontext(self.teardown)
        app.extensions['aggregator_client'] = self

    def get_client(self):
        ctx = stack.top
        if ctx is not None:
            if not hasattr(ctx, 'aggregator_client'):
                ctx.aggregator_client = AggregatorClient(G_CONFIG["AGGREGATOR_HOST"], G_CONFIG["AGGREGATOR_PORT"])
                ctx.aggregator_client.connect()
            return ctx.aggregator_client


    def teardown(self, exception):
        ctx = stack.top
        if hasattr(ctx, 'aggregator_client'):
            ctx.aggregator_client.close()
```

### Integration in create_app

Initialization:
The AggregatorClientExtension is instantiated and initialized with the Flask application.
This setup ensures that the AggregatorClient is available in the application context, allowing any part of the application to send analysis requests to the Rust server seamlessly.
        
# Summary - Flask
A standard RESTful API architecture. Open to extensions and new route versions, not limited to handling another database, schemas etc. Extensions allow to encapsulate certain aspects and provide reliable scalability.
# 4 Service details - Next.js Frontend Server
The Next.js frontend server is the view layer of the application, responsible for delivering a responsive and user-friendly interface. It exclusively communicates with the Flask server through actions, ensuring a seamless interaction between the frontend and backend. The most advanced feature of this app is the form constructor, which allows users to create and customize forms dynamically.
## Directory structure
```bash
.
├── app
│   ├── bookmarks
│   │   └── page.tsx
│   ├── create
│   │   └── page.tsx
│   ├── error.tsx
│   ├── explore
│   │   ├── error.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── form
│   │   ├── not-found.tsx
│   │   └── [slug]
│   │       ├── analytics
│   │       │   ├── page.module.css
│   │       │   └── page.tsx
│   │       ├── answer
│   │       │   ├── page.module.css
│   │       │   └── page.tsx
│   │       ├── page.module.css
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.module.css
│   ├── page.tsx
│   └── paths.ts
├── components
│   ├── Footer.tsx
│   ├── formComponents
│   │   ├── editable
│   │   │   ├── CheckBoxComponentEdit.tsx
│   │   │   ├── DateComponentEdit.tsx
│   │   │   ├── DateTimeComponentEdit.tsx
│   │   │   ├── NumberComponentEdit.tsx
│   │   │   ├── RadioComponentEdit.tsx
│   │   │   ├── TextComponentEdit.tsx
│   │   │   └── TimeComponentEdit.tsx
│   │   ├── editableHelpers
│   │   │   ├── ChoicesFieldArray.tsx
│   │   │   └── EditablePreamble.tsx
│   │   ├── EditComponentFactory.tsx
│   │   ├── FormComponentFactory.tsx
│   │   ├── FormComponent.module.css
│   │   └── RawHTMLComponentFactory.tsx
│   ├── formConstructor
│   │   ├── FormConstructorBase.tsx
│   │   ├── FormConstructorFinish.tsx
│   │   ├── FormConstructorHeader.tsx
│   │   ├── FormConstructor.module.css
│   │   ├── FormConstructor.tsx
│   │   ├── SortableItem.tsx
│   │   └── SpawnComponentButton.tsx
│   ├── forms
│   │   ├── BookmarkedList.tsx
│   │   ├── FormAnswerable.tsx
│   │   ├── FormCard.module.css
│   │   ├── FormCard.tsx
│   │   ├── FormExplorer.tsx
│   │   ├── FormList.tsx
│   │   ├── FormLoader.tsx
│   │   ├── RawHTMLForm.tsx
│   │   ├── SearchBar.module.css
│   │   └── SearchBar.tsx
│   ├── nav
│   │   ├── MainNav.module.css
│   │   ├── MainNav.tsx
│   │   └── NavItem.tsx
│   └── UI
│       ├── Bookmark.tsx
│       ├── ConfirmationModal.tsx
│       ├── FileSelector.tsx
│       ├── Spinner.tsx
│       └── SquareButton.tsx
├── misc
│   ├── actions.ts
│   ├── hooks.ts
│   ├── http.ts
│   └── types.ts
├── next.config.mjs
├── package.json
├── package-lock.json
├── public
│   ├── blur.jpg
│   ├── home-connections.jpg
│   ├── home-main.jpg
│   ├── home-security.jpg
│   └── logo.svg
├── stores
│   ├── appContext.tsx
│   └── formConstructorContext.tsx
└── tsconfig.json
```
The root of the Next.js app is "former-frontend" and it houses a pretty basic Next.js + TypeScript app.
## Overview

- app: Contains the main pages and routes of the application.
- components: Houses reusable components including form components and form constructor elements.
- misc: Includes utility files such as actions for communicating with the Flask server, hooks, HTTP client configurations, and types.
- public: Contains static assets like images and icons.
- stores: Manages application-wide state using React context.
- next.config.mjs: Configuration file for Next.js.
- package.json and package-lock.json: Manage project dependencies.
- tsconfig.json: TypeScript configuration file.

## Actions

Actions are functions that facilitate communication between the frontend and the Flask server. They handle the HTTP requests and responses, ensuring that the frontend can interact with the backend seamlessly. It's important to remember that actions are used server side - that means the user's browser sends a request to the Next.js server that then sends the request to Flask server as a middleman. This approach ensures safety, limiting Cross-Site scripting etc. \

*There's no need to go into detail with actions, they just utilize the defined routes in routes.py using fetch API.*

## Form Constructor
The form constructor is the most advanced feature of the application, enabling users to create and customize forms dynamically. It provides a rich UI to add, edit, and arrange different form components. The form constructor is designed to be highly interactive and user-friendly, supporting a 'drag and drop' approach to facilitate the construction of forms. This approach is mobile-friendly, ensuring a seamless experience across devices.
### Key Technologies
- React-Hook-Form: This library is used for managing form state and validation. It simplifies the process of building and maintaining forms by providing hooks to manage form data, validation, and submission.
- React @dnd-kit: This library is used for implementing drag-and-drop functionality. It allows users to reorder form components by dragging and dropping them, providing a highly interactive and intuitive interface.

### Features

- Dynamic Form Creation:
        Users can add various types of components to the form, such as text fields, checkboxes, radio buttons, number inputs, date pickers, and more.
        Each component can be customized with specific attributes like labels, default values, required fields, and constraints.

- Drag-and-Drop Interface:
        The React @dnd-kit library enables a drag-and-drop interface, allowing users to reorder components within the form easily.
        This feature enhances the user experience, making form construction more intuitive and flexible.

- Component Factory Pattern:
        The form constructor uses a factory pattern to create components dynamically.
        The EditComponentFactory and FormComponentFactory components are responsible for rendering the appropriate form component based on the type specified.

- Validation and Error Highlighting:
        The form constructor includes robust validation to ensure that the forms are constructed correctly.
        It highlights invalid choices, such as:
    - No label for a component.
    - Minimum value larger than the maximum value for number components.
    - Empty or no choices for checkboxes and radio buttons.

# Summary
The Next.js frontend server provides a rich, interactive interface for users to create, manage, and analyze forms. It relies on actions to communicate with the Flask server, ensuring a clean separation of concerns. The form constructor stands out as the most advanced feature, offering a user-friendly and dynamic way to build forms. It's completely separated from the backend and in case the schemas change (let's say there's api v2), only few changes need to be made, easily modifying the codebase thanks to TypeScript's rich static analysis.

# 5. Rust Analysis Server
The Rust analytics server is designed to handle the computationally intensive tasks of analyzing form responses. It uses criteria-based analysis to evaluate responses against specified conditions. The server's architecture is simple but effective, leveraging Rust's performance and concurrency features to process requests efficiently.
## Directory Structure
```bash
.
├── Cargo.lock
├── Cargo.toml
└── src
    ├── analyze.rs
    ├── listener.rs
    ├── main.rs
    └── schemas.rs
```
- Cargo.lock and Cargo.toml: Manage dependencies and project configuration.
- src: Contains the source code for the Rust server.
    - analyze.rs: Contains the core logic for analyzing form responses.
    - listener.rs: Sets up the TCP listener for receiving requests.
    - main.rs: Entry point for the application, including request processing.
    - schemas.rs: Defines data structures, translated from the Python schemas.

## Key Components

- Schemas: Data structures translated from Python, ensuring consistent data representation across services.

- Analysis Logic: The main functionality is implemented in analyze.rs.

- TCP Listener: Listens for incoming requests, implemented in listener.rs.

- Main Function: Sets up the MongoDB connection and handles request processing.

## Analysis Logic

The analyze.rs module contains the core logic for analyzing form responses. It uses various criteria to evaluate responses and compute results.

```rust
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
```
- Criteria: Defines various criteria for analysis, including equality, comparison, date, time, regex matching, and option choices.
- Analyzer Trait: A trait implemented by Criteria to analyze values.
- FormAnswer: Implements methods to analyze individual and multiple requests.
- Form: Implements methods to analyze all answers and compute percentages.

## TCP Listener and Request Processing

The listener module is responsible for setting up a TCP server that listens for incoming analysis requests, processes them, and returns the results. It utilizes asynchronous operations to handle multiple connections concurrently, ensuring efficient processing.
### Key Components and Workflow


#### Constants and Structs:

Defines constants for the server address and data structures for requests and responses.

```rust

const ADDR: &str = "127.0.0.1:6000";

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestJSON {
    pub form: String,
    pub analysis: Vec<AnalysisRequest>,
}

#[derive(Serialize, Deserialize)]
enum ResponseStatus {
    Fail,
    Success,
}

#[derive(Serialize, Deserialize)]
struct ResponseJSON<T> {
    pub status: ResponseStatus,
    pub data: Option<T>,
    pub message: String,
}
```
#### Helper Functions:

construct_fail_response: Constructs a failure response JSON.

```rust

fn construct_fail_response(message: &str) -> Vec<u8> {
    let res: ResponseJSON<String> = ResponseJSON {
        status: ResponseStatus::Fail,
        data: None,
        message: String::from(message),
    };
    let str = serde_json::to_string(&res).unwrap_or(String::from("Critical app error."));
    str.into_bytes()
}
```
### Main Listener Function:

The listen function sets up the TCP listener, accepts incoming connections, and processes each request asynchronously.

```rust

pub async fn listen<F, Fut>(process_request: F) -> Result<(), tokio::io::Error>
where
    F: Fn(RequestJSON) -> Fut + Clone + Send + std::marker::Sync + 'static,
    Fut: Future<Output = AnalysisResult> + Send,
{
    let listener = TcpListener::bind(ADDR).await?;
    println!("Listening on {}", listener.local_addr()?);

    let process_request = Arc::new(process_request);

    loop {
        let (mut socket, addr) = listener.accept().await?;
        println!("Received connection from {}", addr);

        let process_request = process_request.clone();

        tokio::spawn(async move {
            let mut buffer = vec![0; 1024]; // Buffer for reading data

            match socket.read(&mut buffer).await {
                Ok(size) if size > 0 => {
                    let request: Result<RequestJSON, _> = serde_json::from_slice(&buffer[..size]);

                    match request {
                        Ok(req) => {
                            println!("Received request: {:?}", req);

                            let response = construct_response(req, &*process_request).await;
                            let serialized =
                                serde_json::to_string(&response).unwrap_or_else(|_| {
                                    String::from("{\"error\": \"Failed to serialize response\"}")
                                });

                            if let Err(e) = socket.write_all(serialized.as_bytes()).await {
                                eprintln!("Failed to send response: {}", e);
                            }
                        }
                        Err(e) => {
                            println!("Failed to deserialize request: {}", e);
                            let res = construct_fail_response("Failed to deserialize request.");
                            let _ = socket.write_all(&res).await;
                        }
                    }
                }
                Ok(_) => {
                    println!("Connection closed by client.");
                }
                Err(e) => {
                    println!("Failed to read from socket: {}", e);
                }
            }
        });
    }
}
```
#### Construct Response Function:

Constructs the appropriate response based on the result of the analysis.

```rust

    async fn construct_response<F, Fut>(req: RequestJSON, processor: F) -> ResponseJSON<Vec<f64>>
    where
        F: Fn(RequestJSON) -> Fut,
        Fut: Future<Output = AnalysisResult>,
    {
        match processor(req).await {
            AnalysisResult::Success(data) => ResponseJSON {
                status: ResponseStatus::Success,
                data: Some(data),
                message: "Analysis successful".to_string(),
            },
            AnalysisResult::NoAnswersFound => ResponseJSON {
                status: ResponseStatus::Fail,
                data: None,
                message: "No answers found for the given criteria".to_string(),
            },
            AnalysisResult::NoFormsFound => ResponseJSON {
                status: ResponseStatus::Fail,
                data: None,
                message: "No forms found for the given form ID".to_string(),
            },
            AnalysisResult::BadRequest(message) => ResponseJSON {
                status: ResponseStatus::Fail,
                data: None,
                message: message,
            },
        }
    }
```
### Workflow

1. Binding to the Address:

The TCP listener binds to the specified address and port (127.0.0.1:6000).

2. Accepting Connections:

The listener enters a loop to continuously accept incoming connections.


3. Handling Connections:

For each accepted connection, a new task is spawned to handle the request asynchronously.

4. Processing Requests:

The request is read into a buffer, deserialized, and passed to the process_request function.

5. Constructing Responses:

The construct_response function constructs an appropriate response based on the analysis result.

## Main Function
The main function of the Rust analytics server sets up the MongoDB connection, initializes the database collections, and starts the TCP listener to process incoming requests. Here’s a detailed breakdown of how this is achieved:
```rust
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
    // Parse and set up MongoDB client options
    let mut client_options = ClientOptions::parse(DB_URI).await?;
    client_options.app_name = Some("answer_aggregator".to_string());
    let client = Client::with_options(client_options)?;

    // Initialize the database and collections
    let database = client.database(DB_NAME);
    let answers_collection = Arc::new(database.collection::<FormAnswer>(COLLECTION_ANSWERS));
    let forms_collection = Arc::new(database.collection::<Form>(COLLECTION_FORMS));

    // Start the TCP listener and handle incoming requests
    let _ = listener::listen(move |req| {
        let forms_collection = forms_collection.clone();
        let answers_collection = answers_collection.clone();
        async move {
            // Parse the form UUID from the request
            let form_uuid = ObjectId::from_str(&req.form).unwrap_or_default();
            
            // Fetch the form data from the forms collection
            match forms_collection
                .find_one(bson::doc! {"_id": form_uuid}, None)
                .await
            {
                Ok(Some(form)) => {
                    // Fetch the answers related to this form
                    match answers_collection
                        .find(bson::doc! {"form_id": form_uuid}, None)
                        .await
                    {
                        Ok(cursor) => {
                            let answers: Vec<FormAnswer> = cursor.try_collect().await.unwrap_or_default();
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
```
## Key Components and Workflow

- MongoDB Client Setup:
Client Options: The MongoDB client options are parsed and configured, including setting an application name.

```rust

    let mut client_options = ClientOptions::parse(DB_URI).await?;
    client_options.app_name = Some("answer_aggregator".to_string());
    let client = Client::with_options(client_options)?;
```
## Database and Collection Initialization:

The database and two collections (form and form_answer) are initialized and wrapped in Arc for thread-safe reference counting.

```rust

    let database = client.database(DB_NAME);
    let answers_collection = Arc::new(database.collection::<FormAnswer>(COLLECTION_ANSWERS));
    let forms_collection = Arc::new(database.collection::<Form>(COLLECTION_FORMS));
```
## TCP Listener:

The TCP listener is started, and it processes incoming requests using an asynchronous closure. It takes a closure as an argument.

```rust

    let _ = listener::listen(move |req| {
        let forms_collection = forms_collection.clone();
        let answers_collection = answers_collection.clone();
        async move {
            let form_uuid = ObjectId::from_str(&req.form).unwrap_or_default();
            
            match forms_collection
                .find_one(bson::doc! {"_id": form_uuid}, None)
                .await
            {
                Ok(Some(form)) => {
                    match answers_collection
                        .find(bson::doc! {"form_id": form_uuid}, None)
                        .await
                    {
                        Ok(cursor) => {
                            let answers: Vec<FormAnswer> = cursor.try_collect().await.unwrap_or_default();
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
```
## Request Handling:

Form UUID Parsing: The form UUID is parsed from the request.

```rust

let form_uuid = ObjectId::from_str(&req.form).unwrap_or_default();
```
## Fetch Form Data
The form data is fetched from the forms_collection. If the form is found, it proceeds to fetch the related answers.

```rust

match forms_collection
    .find_one(bson::doc! {"_id": form_uuid}, None)
    .await
{
    Ok(Some(form)) => {
        // Fetch answers...
    }
    Ok(None) => AnalysisResult::NoFormsFound,
    Err(_) => AnalysisResult::BadRequest("Failed to fetch form data".to_string()),
}
```
## Fetch Form Answers
The answers related to the form are fetched from the answers_collection. If answers are found, they are analyzed based on the criteria provided in the request.

```rust

    match answers_collection
        .find(bson::doc! {"form_id": form_uuid}, None)
        .await
    {
        Ok(cursor) => {
            let answers: Vec<FormAnswer> = cursor.try_collect().await.unwrap_or_default();
            let analysis_results = form.analyze(&answers, &req.analysis);
            AnalysisResult::Success(analysis_results)
        }
        Err(_) => AnalysisResult::NoAnswersFound,
    }
```
## Analysis Result
The analysis results are computed and returned as an AnalysisResult enum, which can represent success with results, no answers found, no forms found, or a bad request with an error message.

## Error Handling and Cleanup:

The function handles potential errors in fetching forms and answers, returning appropriate error messages.

## Asynchronous Execution:

The main function is marked as async and uses the tokio runtime to execute the asynchronous operations.



# Summary
The Rust analytics server performs criteria-based analysis on form responses, leveraging Rust's performance and concurrency capabilities. The core logic resides in the analyze.rs module, which evaluates responses based on various criteria. The main.rs initializes the MongoDB connection and starts the server.
The listener module sets up a TCP server that listens for incoming analysis requests, processes them asynchronously, and sends back the results. It uses the tokio crate for asynchronous operations and the serde crate for JSON serialization and deserialization. The listener handles each connection in a separate task, ensuring efficient processing and scalability. By constructing appropriate responses based on the analysis results, it ensures robust and reliable communication with clients.

# 6. TODO / unfinished aspects
Despite the considerable progress made on the application, there are still several areas that require attention and improvement. Below is a list of unfinished aspects and enhancements that need to be addressed:
- Bad CSS and Little Animations

    Current State: The CSS for the application is not optimized, leading to a subpar user experience. There are minimal animations, which makes the interface feel less dynamic and interactive. Styles are inconsitent.
    Action Needed: Improve the CSS by refining styles and ensuring consistency across the application. Add animations to enhance the user experience, making interactions feel smoother and more engaging.

- Unfinished Analysis Next.js Page

    - Current State: The page responsible for displaying analysis results in the Next.js frontend is incomplete. This limits the ability of users to view and interpret the results of form analysis.
    - Action Needed: Complete the implementation of the analysis page. Ensure that it correctly fetches and displays analysis results from the backend. Add interactive elements and visualizations to make the data more understandable.

- Another Analysis Function that Displays Percentage of Choices

    - Current State: There is a need for an additional analysis function that can display the percentage of each choice selected in forms, providing a clearer understanding of the responses.
    - Action Needed: Implement the new analysis function in the Rust server to calculate and return the percentage of each choice. Update the Next.js frontend to request and display this new analysis data.

- Delete Form from Next.js (API Endpoint Exists)

    - Current State: While the API endpoint for deleting forms exists, the corresponding functionality in the Next.js frontend has not been implemented.
    - Action Needed: Add the delete form functionality to the frontend. Ensure that users can delete forms directly from the interface, with appropriate confirmation dialogs and feedback.

- Awful Polymorphism in Form Component

    - Current State: The current implementation of polymorphism in the form components is suboptimal, making the codebase harder to maintain and extend. 
    - Action Needed: Refactor the form component implementation to improve polymorphism. Ensure that the design pattern used is efficient and maintainable, potentially leveraging more advanced features of TypeScript or Rust.

- Answers Are an Array: They Need the Original Form to Be Analyzed Properly

    - Current State: The answers are stored as an array, which complicates analysis as the original form structure is required to interpret the responses correctly.
    - Action Needed: Modify the data structure to ensure that each answer can be directly associated with its corresponding form component. This might involve storing additional metadata or restructuring the answers array.

- Better Comments

    - Current State: The codebase lacks sufficient comments, making it difficult for other developers to understand the logic and purpose of various sections of code.
    - Action Needed: Add detailed comments throughout the codebase. Ensure that every significant block of code is documented, explaining the logic and purpose clearly. This will aid future maintenance and development efforts.

The application is functional, but there are several areas that need improvement to enhance usability, maintainability, and functionality. Addressing the issues outlined in this TODO list will help to polish the application, making it more robust and user-friendly. Prioritizing these tasks will ensure the application reaches its full potential.


# 7. Future Development Directions

As the application continues to evolve, there are several key areas of focus that can significantly enhance its functionality, scalability, and maintainability. Below are some future development directions to consider:
- Kubernetes

   - Current State: The application is not currently orchestrated using Kubernetes, which limits its scalability and resilience.
    - Future Direction: Implement Kubernetes to manage and orchestrate the deployment of application components. This will improve scalability, allow for better resource management, and enhance the resilience of the application by enabling features such as auto-scaling, load balancing, and rolling updates.

- Tests
    - Current State: The application lacks comprehensive testing, making it difficult to ensure code quality and catch bugs early.
    - Future Direction: Develop a suite of automated tests, including unit tests, integration tests, and end-to-end tests. Utilize testing frameworks such as Jest for the Next.js frontend, PyTest for the Flask backend, and appropriate testing tools for the Rust server. This will help maintain code quality and reliability as the application grows.

- Containerization
    - Current State: The application is not fully containerized, which can complicate deployment and environment consistency.
    - Future Direction: Containerize all application components using Docker. This includes creating Docker images for the Flask server, Next.js frontend, and Rust server. Containerization will simplify deployment, ensure environment consistency, and facilitate local development and testing.

- Switch to SQL Database for Easier Analysis
    - Current State: The application currently uses MongoDB, which can be less intuitive for certain types of analysis compared to SQL databases.
    - Future Direction: Consider migrating to an SQL database such as PostgreSQL or MySQL. SQL offers  powerful querying capabilities and can simplify complex data analysis tasks. This transition will involve refactoring the data models and queries to fit the relational paradigm.

- Implement Caching
    - Current State: The application does not implement caching (excluding Next.js), which can lead to inefficiencies and slower response times.
    - Future Direction: Introduce caching mechanisms to store frequently accessed data and reduce database load. Use technologies such as Redis or Memcached to cache responses and intermediate data. Implementing caching will improve performance and scalability.

- Use Common .env File Across Services
    - Current State: The Rust service does not share the common .env file used by other services, leading to potential configuration inconsistencies.
    - Future Direction: Standardize the use of a common .env file across all services, including the Rust server. This ensures consistent configuration and simplifies environment management. Tools like dotenv can be used to load environment variables across different programming languages.

- Using Indexing in Database
    - Current State: The database may not be fully optimized for query performance, particularly when grouping answers by form IDs.
    - Future Direction: Implement indexing in the database to improve query performance. Specifically, create indexes on fields such as form IDs to optimize queries that group answers by the forms they belong to. This will significantly enhance the efficiency of data retrieval operations.

- Security Enhancements
    - Current State: The Rust and Flask server's security could be improved, particularly by restricting accepted connections.
    - Future Direction: Enhance security measures, especially for the Rust server. Implement a solution to accept connections only from the Flask server. This can be achieved through IP whitelisting, mutual TLS authentication, or other network security practices.
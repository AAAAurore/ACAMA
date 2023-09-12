export class Questionnaire {
    resourceType : string = "Questionnaire"
    id : string = ""
    status : string = "draft"
    publisher : string = ""
    purpose : string = ""
    contact : Contact[] = []
    item : QuestionnaireItem[] = []
}

export class QuestionnaireItem {
    linkId: string = ""
    prefix: string = ""
    text: string = ""
    type: string = ""
}

export class Contact {
    name: string = "";
}

export class QuestionnaireResponse {
    resourceType: string = "QuestionnaireResponse";
    id: string = ""
    questionnaire: string = ""
    status: string = "in-progress"
    item: QuestionnaireResponseItem[] = []
}

export class QuestionnaireResponseItem {
    linkId: string = ""
    text: string = ""
    answer: Answer[] = []
}

export class Answer {
    valueString: string = ""
}

export class Patient {
    resourceType: string = "Patient"
    id: string = ""
    name: Name = new Name()
    gender: string = ""
    birthDate: string = ""
}

export class Name {
    family: string = ""
    given: string = ""
}

export class Practitioner {
    resourceType: string = "Practitioner"
    id: string = ""
    name: Name = new Name()
    gender: string = ""
}
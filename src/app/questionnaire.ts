export class Questionnaire {
    resourceType : string = "Questionnaire"
    id : string = ""
    status : string = "draft"
    publisher : string = ""
    title : string = ""
    contact : Contact[] = []
    item : QuestionnaireItem[] = []
}

export class QuestionnaireItem {
    linkId: string = ""
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
    source: Patient = new Patient
    status: string = "in-progress"
    item: QuestionnaireResponseItem[] = []
}

export class QuestionnaireResponseItem {
    linkId: string = ""
    text: string | null = ""
    answer: Answer[] = []
    type: string = ""
}

export class Answer {
    valueString: string = ""
    valueBoolean: boolean | null = null;
    valueInteger: number | null = null;
}

export class Patient {
    resourceType: string = "Patient"
    identifier: Identifier = new Identifier
    id: string = ""
    name: Name[] = []
    gender: string = ""
    birthDate: string = ""
}

export class Identifier {
    value: string = ""
}

export class Name {
    family: string = ""
    given: string = ""
}

export class Practitioner {
    resourceType: string = "Practitioner"
    id: string = ""
    name: Name[] = []
    gender: string = ""
    address: Address = new Address
    telecom: ContactPoint = new ContactPoint
}

export class Address{
    line: string = ""
    city: string = ""
    state: string = ""
    postalCode: string = ""
    country: string = ""
}

export class ContactPoint {
    value: string = ""
}
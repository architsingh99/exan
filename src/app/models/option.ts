export class Option {
    id: number;
    questionId: number;
    name: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.question_id;
        this.name = data.title;
        this.isAnswer = data.is_correct_answer;
    }
}

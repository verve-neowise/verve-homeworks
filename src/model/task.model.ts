export enum State {
    Compete = "complete",
    Wait = "wait"
}

export default class Task {
    id: string
    userId: number
    homeworkId: string
    name: string
    surname: string
    result: string | null
    state: State

    constructor(
        id: string,
        userId: number,
        homeworkId: string,
        name: string = '',
        surname: string = '',
        result: string | null = null,
        state: State = State.Wait
    ) {
        this.id = id
        this.userId = userId
        this.homeworkId = homeworkId
        this.name = name
        this.surname = surname
        this.result = result
        this.state = state
    }
} 
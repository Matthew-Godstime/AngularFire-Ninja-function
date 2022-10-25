export interface ReqData {
    text: string,
    upvotes: number,
}

export interface UserData {
    email: string,
    upVotedOn: string[]
}

export interface UpVote {
    reqId: string,
}
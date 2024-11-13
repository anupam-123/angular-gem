export class chat_model {
  human: string = '';
  AI: string = '';

  chatStruct(human: string, AI: string) {
    this.human = human;
    this.AI = AI;
  }
}

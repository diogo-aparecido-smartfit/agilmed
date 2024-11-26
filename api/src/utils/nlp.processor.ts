import natural from "natural";

export class NLPProcessor {
  private tokenizer: natural.WordTokenizer;
  private classifier: natural.BayesClassifier;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.classifier = new natural.BayesClassifier();

    // Adicionando documentos de treinamento para o classificador
    this.classifier.addDocument("Oi", "greeting");
    this.classifier.addDocument("Olá", "greeting");
    this.classifier.addDocument("Tudo bem?", "greeting");
    this.classifier.addDocument("Qual é o seu nome?", "ask_name");
    this.classifier.addDocument("Qual é a sua idade?", "ask_age");
    this.classifier.addDocument("Onde fica a farmácia?", "request_pharmacy");
    this.classifier.addDocument("farmácia mais próxima", "request_pharmacy");
    this.classifier.addDocument(
      "Onde é a clínica mais próxima?",
      "request_clinic"
    );
    this.classifier.train();
  }

  // Método para classificar a entrada
  public classify(text: string): string {
    const classification = this.classifier.classify(text);
    console.log("Classificação:", classification); // Adicionando log para verificar a classificação
    return classification;
  }

  // Método de tokenização
  public tokenize(text: string): string[] {
    return this.tokenizer.tokenize(text);
  }
}

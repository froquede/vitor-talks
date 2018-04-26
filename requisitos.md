# Requisitos VitorTalks

### Typing
Primeiramente o Vitor deve selecionar se é **Vogal (Ø), Linha 1, Linha 2 ou Linha 3**.
Terá um timer (Progress loader border - Visualizar layout) de 5 segundos (Podendo ser alterado após testes). Se a tecla confirmar (UP) for acionada a opção que estiver ativa irá ativar a sua linha correspondente. EX: Se ele selecionar VOGAL, a linha de vogais (A,E,I,O,U) ficará ativa.
Após ir para a linha, o Vitor irá usar o mesmo mecanismo para escolher qual o carácter. Após selecionado, o caractere deve aparecer no textarea e o ciclo recomeça.
Quando ele terminar de adicionar os caracteres (formar uma frase) ele pode usar a tecla direita para submeter a mensagem.
Ao concluir uma conversa ou uma rotina, ele poderá clicar para esquerda e um modal abrirá para que os textos sejam enviados para um e-mail.

> OBS: Cada troca de carácter o display preto deve acompanhar e trocar também a letra para facilitar a leitura do Vitor


### Controllers
- UP: Confirmar
- DOWN: Desfazer (Voltar última ação)
- RIGHT: Enter (Enviar mensagem)


### Actions (Serve para o Desfazer)
- Selecionar Linha (Ø, 1, 2, 3)
- Selecionar Caracter
- Submeter Mensagem


### Saving
Armazenar as mensagens no LocalStorage e com botão para esquerda enviar toda a conversa para um e-mail.


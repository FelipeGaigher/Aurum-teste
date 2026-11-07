# Telas observadas no Astrea

Registro bruto, uma entrada por tela, na ordem em que apareceram. Serve de
evidência para o diagnóstico da Q1 e de referência para a tela da Q3.

Cada entrada separa o que a tela mostra (fato) do que a gente conclui
(hipótese). Hipótese só vira problema na Q1 depois de confirmada em outra
tela ou em outra fonte.

Os prints ficam em `evidencias/`, numerados na mesma ordem.

## Cadastro do trial

### 01 e 02. Formulário de nome e e-mail, com bloqueador ligado

Prints: `01-cadastro-bloqueado-network.png`, `02-cadastro-bloqueado-console.png`.

Fato:

- Nome e e-mail preenchidos, botão "Continuar" cinza e sem ação.
- Nenhuma mensagem na tela. Nenhum campo marcado como inválido.
- Console com dezenas de erros da ferramenta de consentimento AdOpt
  recusando o script de teste A/B. Network com dois scripts bloqueados por
  extensão.

Hipótese:

- O estado do botão depende de script de terceiro. Quando o script não
  carrega, o formulário morre em silêncio. Usuário com bloqueador não entra
  e não sabe por quê.
- Severidade alta para um funil de aquisição. Vale confirmar quantos
  visitantes usam bloqueador, com o time de marketing.

### 03. Pergunta do celular

Print: `03-cadastro-celular.png`.

Fato:

- Quarto passo do cadastro, depois de nome, e-mail e faixa de processos.
  O enunciado da vaga cita o telefone como campo do cadastro. Ele existe,
  só vem depois do e-mail.
- Barra de progresso sem rótulo e sem contagem de passos.
- Texto de apoio com emoji: "Usaremos seu número apenas para te ajudar
  durante o teste do Astrea. 🙂".
- Coluna esquerda com a oferta "Novembro Black": contador regressivo e três
  lotes de desconto. Tudo dentro do fluxo de criar conta de teste.
- Botão primário azul `#0096d6`, campo com raio de 8px, fonte Open Sans.

Hipótese:

- A barra sem contagem não diz quanto falta. Em quatro passos, dizer
  "passo 3 de 4" custa nada e reduz abandono.
- Contador e lote de desconto dentro do cadastro de trial são pressão de
  urgência. A pessoa ainda nem viu o produto. Padrão escuro leve. Confirmar
  com o time se é teste A/B ou padrão permanente.
- Emoji no texto de apoio é escolha de tom. Para advogado em dia de prazo,
  pode soar leve demais. Hipótese fraca, depende de pesquisa.

### 04. Senha

Print: `04-cadastro-senha.png`.

Fato:

- Último passo. Cinco regras de senha em chips verdes, cada uma com
  marca de check conforme a regra é atendida.
- Título com emoji: "Falta pouco para começar a usar o Astrea! 😊".
- Botão "Voltar" com anel de foco preto, padrão do navegador, diferente
  da cor da marca.
- Botão primário "Iniciar teste grátis".

Hipótese:

- Os chips de regra de senha são um bom padrão: feedback imediato, sem
  mensagem de erro depois do envio. Vale levar para o DS como componente de
  validação em tempo real.
- O anel de foco padrão do navegador indica que não há token de foco. Se
  o produto logado repetir isso, vira item de acessibilidade na Q1.

## Produto logado

Sem tela ainda. Próximas: Área de Trabalho, Agenda, Kanban, criar
atividade com todos os campos abertos, e a navegação entre módulos.

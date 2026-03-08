#Card-Gem

Extensão para o Google Chrome que transforma dados de ofertas em Cards de Bolsa visuais.

## Instalação

1. Abra o Chrome e acesse `chrome://extensions/`
2. Ative o **Modo do desenvolvedor** (canto superior direito)
3. Clique em **Carregar sem compactação**
4. Selecione a pasta `ProjetoExtensão`

## Uso

1. Clique no ícone da extensão na barra de ferramentas do Chrome
2. Preencha o formulário com os dados do curso:
   - **Identificação:** Curso, Cidade (Unidade), Grau, Modalidade, Turno
   - **Condição:** Triplo Facilita ou Sem Facilita
   - **Valores:** Matrícula, Bolsa, Mensalidades
3. Clique em **Gerar Card**

## Lógica de Branding

- **UNISUL** (Araranguá, Braço do Norte, Continente, Criciúma, Florianópolis, Itajaí, Pedra Branca, Tubarão): logo com chevron à esquerda, cor verde limão (#c6ff00)
- **UNISOCIESC** (Anita Garibaldi, Blumenau, Jaraguá do Sul, São Bento do Sul): logo com chevron à direita, cor rosa (#ed145b)

## Tecnologias

O código gerado usa:
- React
- Tailwind CSS
- Lucide React (ícones)

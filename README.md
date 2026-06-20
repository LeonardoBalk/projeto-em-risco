# Projeto em Risco

Jogo educacional de gerência de projetos desenvolvido como protótipo para a disciplina de Gerência de Projetos.

## Sobre

O jogador assume o papel de gerente de um projeto de software e precisa tomar decisões frente a eventos de risco e oportunidades. O objetivo é manter as três métricas do projeto: **Prazo**, **Custo** e **Qualidade** acima de zero até o fim das rodadas.

## Como jogar

1. Escolha a dificuldade (Fácil, Médio ou Difícil)
2. A cada rodada, um evento aparece com 3 opções de resposta
3. Cada escolha impacta as métricas de forma diferente
4. Se qualquer métrica chegar a zero, o projeto é cancelado
5. Ao final, você recebe uma nota: Ouro, Prata ou Bronze

## Dificuldades

| Dificuldade | Métricas iniciais | Multiplicador de penalidade | Cartas | Ouro (mín.) |
|-------------|-------------------|-----------------------------|--------|-------------|
| Fácil       | 100               | 1.0×                        | 10     | 75          |
| Médio       | 85                | 1.15×                       | 10     | 58          |
| Difícil     | 80                | 1.2×                        | 12     | 48          |

## Estrutura

```
index.html   — estrutura HTML
style.css    — estilos
script.js    — lógica do jogo e dados dos cards
logo.png     — imagem do menu
```

## Tecnologias

- HTML, CSS e JavaScript puro (sem frameworks)
- [Twemoji](https://github.com/twitter/twemoji) para renderização de emojis
- Google Fonts (Outfit)

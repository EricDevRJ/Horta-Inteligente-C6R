# 🌱 Horta Inteligente Planta e Gota

A **Planta e Gota** é um projeto de **horta inteligente e sustentável** desenvolvido pelo grupo **C6R** para o programa **Shell Nxplorers**.

O projeto busca utilizar a tecnologia para tornar o cultivo de plantas mais eficiente, reduzir o desperdício de água e facilitar o acompanhamento das condições da horta.

A horta utiliza um sistema baseado em **ESP32 e sensores** para monitorar características importantes do ambiente e do solo. Com essas informações, o sistema pode controlar automaticamente a irrigação, fornecendo água às plantas quando necessário.

## 💧 Como funciona?

O sistema reúne diferentes componentes para acompanhar as condições da horta:

- 🌱 **Sensores de umidade do solo** verificam a umidade presente na terra.
- 🌡️ **Sensor DHT22** monitora a temperatura e a umidade do ar.
- 💦 **Sensor de fluxo YF-S201** mede a quantidade de água que passa pelo sistema de irrigação.
- 🚰 **Sensor de nível** ajuda a verificar a disponibilidade de água no reservatório.
- ⚡ **ESP32** funciona como controlador central, recebendo os dados dos sensores e comandando o sistema.
- 💧 **Bomba de água** realiza a irrigação quando acionada.
- 🔌 **Módulo relé** permite ao ESP32 controlar a bomba.

A água é distribuída por **microtubos e gotejadores**, que a direcionam às plantas de forma controlada.

## 🌍 Sustentabilidade

A proposta da Planta e Gota não é apenas automatizar uma horta, mas **usar a tecnologia para enfrentar um problema real: o uso consciente da água na produção de alimentos**.

Ao monitorar a umidade do solo e ajustar a irrigação à necessidade das plantas, o sistema busca evitar tanto a falta quanto o excesso de água.

O projeto também explora a relação entre **água, alimentos e energia**, mostrando como esses recursos estão conectados e como soluções tecnológicas podem contribuir para seu uso mais consciente.

## 🌿 Objetivos

A Planta e Gota busca desenvolver uma horta que seja:

- 💧 Mais eficiente no uso da água;
- 🌱 Mais fácil de monitorar;
- ⚙️ Automatizada quando necessário;
- ♻️ Orientada por práticas sustentáveis;
- 📚 Uma ferramenta de aprendizado sobre tecnologia, agricultura e meio ambiente.

Mais do que uma horta automatizada, a **Planta e Gota** representa a ideia de que pequenas soluções tecnológicas podem ajudar a tornar o cultivo de alimentos mais eficiente e sustentável.

## 📊 Dashboard

O dashboard complementa a horta física com uma interface para acompanhar os dados recebidos e visualizar o funcionamento do sistema.

### Funcionalidades demonstradas

- 🏠 **Início:** visão geral com estado da irrigação, umidade média do solo, temperatura, consumo diário de água e indicador de saúde da horta.
- 📊 **Sensores:** leituras individuais dos quatro sensores de umidade do solo, temperatura e umidade do ar, além do consumo de água e do estado da bomba.
- 📈 **Relatórios:** consumo de água do dia, média de umidade do solo, indicador visual e relatório semanal.
- 🎯 **Missões:** área de acompanhamento das missões e da evolução da equipe.
- 👥 **Quem somos:** apresentação da equipe C6R e do projeto.
- 🚿 **Controle da irrigação:** painel com modos automático e manual. No modo automático, o ESP32 controla a irrigação; no modo manual, a interface permite enviar o comando da bomba.
- 📱 **Acesso pelo navegador:** interface responsiva e manifesto PWA para permitir a instalação oferecida por navegadores compatíveis.

Os valores do dashboard são atualizados a partir dos dados disponíveis no Firebase. Quando o sistema físico está conectado e enviando leituras, as telas refletem essas atualizações.

### Fluxo dos dados

1. Os sensores coletam informações do solo e do ambiente.
2. O ESP32 lê os sensores e controla a irrigação conforme o modo de operação.
3. Os dados são enviados ao Firebase Realtime Database.
4. O dashboard recebe as atualizações e apresenta os indicadores e relatórios.

## 🧰 Tecnologias

- **ESP32** para leitura dos sensores e controle do sistema.
- **HTML, CSS e JavaScript** para a interface do dashboard.
- **Firebase Realtime Database** para receber e atualizar os dados da horta.
- **GitHub Pages** para disponibilizar o dashboard pela web.
- **Web App Manifest** para descrever a experiência instalável oferecida por navegadores compatíveis.

## 📁 Organização do dashboard

```text
.
├── index.html
├── horta.css
├── horta.js
├── manifest.webmanifest
├── imagens/
└── resources/
```

- `index.html` contém as telas e os componentes do dashboard.
- `horta.css` define a aparência e a adaptação para dispositivos móveis.
- `horta.js` cuida da navegação, integração com Firebase, apresentação dos dados e controle da irrigação.
- `manifest.webmanifest` contém o nome, os ícones e as preferências de exibição da PWA.
- `imagens/` e `resources/` guardam imagens do projeto e ícones usados pelo site.

> A instalação pelo navegador depende do suporte e dos critérios de instalação da plataforma. Em dispositivos ou navegadores que não oferecem o prompt personalizado, pode ser necessário usar a opção de instalação do próprio navegador.

### Acesse o projeto

- **Dashboard:** <https://ericdevrj.github.io/Horta-Inteligente-C6R/>
- **Grupo:** C6R
- **Programa:** Shell Nxplorers

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

O dashboard permite acompanhar os dados da horta em tempo real e visualizar:

- Leituras dos sensores de umidade do solo;
- Temperatura e umidade do ar;
- Estado da bomba e modo de irrigação;
- Consumo de água;
- Indicadores e relatórios da horta.

O site foi desenvolvido com **HTML, CSS e JavaScript** e utiliza o **Firebase Realtime Database** para receber e apresentar os dados enviados pelo sistema.

### Acesse o projeto

- **Dashboard:** <https://ericdevrj.github.io/Horta-Inteligente-C6R/>
- **Grupo:** C6R
- **Programa:** Shell Nxplorers

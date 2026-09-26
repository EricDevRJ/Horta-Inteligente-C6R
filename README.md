# Horta Inteligente

Dashboard web responsivo para acompanhar os sensores e o controle de irrigação da Horta Inteligente da equipe C6R. O site é publicado no GitHub Pages e se conecta ao Firebase Realtime Database para apresentar os dados recebidos pelo ESP32.

## Acesso

- **Site:** <https://ericdevrj.github.io/Horta-Inteligente-C6R/>
- **Repositório:** <https://github.com/EricDevRJ/Horta-Inteligente-C6R>

## Funcionalidades

- Painel inicial com estado da bomba, umidade média do solo, temperatura, consumo de água e saúde da horta.
- Tela de sensores para os quatro sensores de umidade do solo, temperatura, umidade do ar, consumo de água e estado da bomba.
- Relatórios de consumo de água e condições da horta, incluindo o resumo semanal recebido do Firebase.
- Navegação entre Início, Sensores, Relatórios, Missões e Quem somos.
- Painel de controle da bomba com modos automático e manual.
- Interface adaptada para telas de celular.
- Manifesto PWA e botão de instalação personalizado em navegadores compatíveis.

## Tecnologias

- HTML, CSS e JavaScript, sem framework de interface.
- Firebase Realtime Database.
- GitHub Pages para hospedagem HTTPS.
- Web App Manifest e APIs de instalação de PWA do navegador.

## Estrutura do site

```text
.
├── index.html
├── horta.css
├── horta.js
├── manifest.webmanifest
├── imagens/
│   ├── logo.jpeg
│   └── vista da horta.jpeg
└── resources/
    ├── pwa-icon-192.png
    └── pwa-icon-512.png
```

- `index.html`: marcação do dashboard e referência ao manifesto.
- `horta.css`: layout, estilos responsivos e botão de instalação.
- `horta.js`: navegação, leituras do Firebase, relatórios, controle de irrigação e integração com o prompt de instalação do navegador.
- `manifest.webmanifest`: nome, ícones, cores e modo de exibição da PWA.
- `imagens/`: imagens exibidas no site.
- `resources/`: ícones nos tamanhos exigidos pelo manifesto.

## Executar localmente

O site é estático e não requer `npm install` para ser visualizado. Como os módulos Firebase são carregados no navegador, abra o projeto por um servidor local HTTP, não diretamente por `file://`.

Uma opção é a extensão **Live Server** no Visual Studio Code:

1. Abra a pasta do projeto no VS Code.
2. Inicie o Live Server a partir de `index.html`.
3. Acesse o endereço local fornecido pela extensão.

Para testar a instalação da PWA, use HTTPS ou `localhost` em um navegador compatível.

## Publicar no GitHub Pages

1. Envie os arquivos do site e suas pastas para a raiz do repositório.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch principal e a pasta `/ (root)`.
5. Salve e aguarde a publicação.
6. Acesse <https://ericdevrj.github.io/Horta-Inteligente-C6R/>.

Mantenha os nomes e caminhos dos arquivos, incluindo letras maiúsculas/minúsculas. O GitHub Pages diferencia caminhos e os arquivos precisam corresponder exatamente às referências em `index.html` e `manifest.webmanifest`.

Após mudar o site, envie os arquivos atualizados para a branch e aguarde o Pages publicar a nova versão. Se uma versão antiga continuar aparecendo, atualize a página ou limpe o cache do navegador.

## Instalar como PWA

### Android e navegadores Chromium

Abra o site publicado no Chrome para Android. Quando o navegador considerar a página instalável e emitir o evento `beforeinstallprompt`, o botão **“📱 Instalar Horta Inteligente”** aparece no cabeçalho, junto da logo. Ao tocá-lo, o próprio navegador apresenta a confirmação oficial de instalação.

O botão permanece oculto até o navegador oferecer esse evento. A aplicação não simula nem força o prompt. A disponibilidade depende do navegador, da versão, do estado de instalação e dos critérios de instalabilidade vigentes.

Se o botão não aparecer, use o menu do Chrome e procure **Instalar app** ou **Adicionar à tela inicial**, quando disponível. Confirme também que:

- o site abre por HTTPS;
- `manifest.webmanifest` e os dois ícones carregam sem erro;
- o nome, `start_url`, escopo e modo de exibição do manifesto estão corretos;
- a PWA ainda não está instalada no dispositivo.

### iPhone e iPad

O Safari para iOS não oferece o evento `beforeinstallprompt`. Para adicionar o site à tela inicial, abra-o no Safari, toque em **Compartilhar** e escolha **Adicionar à Tela de Início**. Nessa plataforma o botão personalizado pode permanecer oculto, pois o navegador não fornece o prompt usado pelo botão.

### Limites de funcionamento offline

O manifesto configura a experiência instalável, mas o projeto não inclui um Service Worker para armazenar arquivos em cache. Portanto, a PWA precisa de internet para carregar o dashboard e acessar os dados do Firebase; a instalação, por si só, não habilita uso offline.

## Firebase

O JavaScript conecta ao Firebase Realtime Database e acompanha estes caminhos:

| Caminho | Uso |
| --- | --- |
| `horta/sensores` | Leituras de umidade do solo, temperatura e umidade do ar |
| `horta/controle/bomba` | Estado ligado/desligado da bomba |
| `horta/controle/modo` | Modo automático ou manual |
| `horta/consumo/hoje` | Consumo de água do dia |
| `horta/relatorios/semana` | Texto ou dados resumidos do relatório semanal |

Os dados dos sensores esperados pelo dashboard incluem `solo1`, `solo2`, `solo3`, `solo4`, `temperatura` e `umidadeAr`. O consumo diário pode ser um número ou um objeto com `litros` ou `total`.

O código do navegador é público. A configuração Firebase incluída no cliente não substitui as regras de segurança do Firebase. Atualmente, o dashboard não realiza autenticação de usuário no Firebase; a tela de senha do controle não deve ser considerada uma barreira de segurança. Antes de proteger dados ou comandos da bomba, configure regras restritivas no Realtime Database e implemente autenticação real no cliente. Nunca coloque credenciais privadas, chaves de serviço ou segredos administrativos no JavaScript do site.

## Atualizações

O site hospedado é carregado diretamente pelo navegador. Ao publicar alterações em HTML, CSS ou JavaScript no GitHub Pages, os visitantes recebem a versão publicada na próxima carga da página, sujeito ao cache do navegador.

A PWA instalada também abre o site hospedado. Mudanças no conteúdo web não exigem reinstalar a PWA. Mudanças nos ícones ou metadados do manifesto podem precisar de uma atualização dos metadados da instalação ou de reinstalação, dependendo do navegador.

## Aplicativo Android (Capacitor)

O APK Capacitor é um empacotador Android separado do deploy do GitHub Pages. A configuração local em `capacitor.config.json` aponta para o site remoto e usa o `capacitor-shell/` como conteúdo local mínimo de inicialização. Isso não substitui nem publica o site.

Se a cópia Android estiver incluída no projeto, os comandos disponíveis em `package.json` incluem:

```powershell
npm install
npm run cap:sync
npm run cap:open:android
npm run cap:build:android
```

O comando de build acima gera um APK de depuração, normalmente em:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

É necessário ter Node.js, Android Studio, Android SDK e os componentes de build do Android instalados. Um APK de release deve ser assinado com uma chave de distribuição protegida. A instalação manual fora da Google Play pode exibir alertas do Android/Play Protect; a assinatura não garante que esses avisos desapareçam.

> A PWA do GitHub Pages e o APK Capacitor são opções distintas de instalação. O botão PWA não baixa o APK: ele solicita a instalação oferecida pelo próprio navegador.

## Segurança e operação

- Use HTTPS para o site e as comunicações com Firebase.
- Restrinja as regras do Realtime Database a usuários e operações autorizadas.
- Teste mudanças de controle de irrigação em ambiente seguro antes de usá-las com a bomba real.
- Não publique arquivos de assinatura Android, senhas ou credenciais privadas no repositório.

# HorusApp site

Site está disponível no link [horusapp.github.io/site/public/](horusapp.github.io/site/public/)

## Setup
```
npm install
```

## Libs e Frameworks

- **Template engine**
<br>
[Supplant crockford](https://gist.github.com/pbroschwitz/3891293)

- **Manipulção do DOM e AJAX**
<br>
[jQuey](http://jquery.com/)

- **Framework de UI**
<br>
[Milligram](https://milligram.github.io/)

- **Icones**
<br>
[Font Awesome](http://fontawesome.io/)

## Task runner
Para desenvolvimento foi utilizado [GulpJs](http://gulpjs.com/). Para cada task dentro de `config/gulp/tasks` é gerado uma task gulp que pode ser utilizada no terminal como `gulp <task>`
<br>

### Tasks custom
- **Build:** Build do site na pasta public
<br>
```
gulp
```

- **Dev:** Build + server em http://localhost:1337/
<br>
```
gulp dev
```

## Páginas desenvolvidas
| Pagina          | URL         |
|-----------------|-------------|
| Home            | /index.html |
| Login           | /login.html |
| Lista de vídeos | /lista.html |
| Vídeo           | /video.html |

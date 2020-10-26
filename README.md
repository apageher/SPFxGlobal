# SPFx-Global

## Summary

**Solución de SPFx de varios WebParts con las siguientes funcionalidades:**

- Funtional components (React Hooks): _myReactHooks_, _pnpControls_ y _lazyLoadHook_ 
- Obtención de datos de SharePoint con PnP:
  - Funtional component: _myReactHooks_ > _PnPSPDataFromSP_
  - Class component: _myReactClassComponent_ > _PnPSPDataFromSP_
- Petición a MS Graph con ‘msGraphClientFactory’:
  - Funtional component: _myReactHooks_ > _RequestToGraph_
  - Class component: _myReactClassComponent_ > _RequestToGraph_
- Petición a MS Graph con PnP
  - Class component: _myReactClassComponent_ > _RequestToGraphWithPnP_
- Petición a Azure Function:
- Funtional component: _myReactHooks_ > _RequestToAzureFx_
- Distinción del EnvironmentType para traer datos Mock
  - Funtional component: _myReactHooks_ > _PnPSPDataFromSP_
  - Class component: _myReactClassComponent_ > _PnPSPDataFromSP_
- WP con PropertyPane (Todos los tipos que proporciona SPFx, validaciones, controles condicionales y los de PnP): _personalPropertyPane_
- Carga de los controles de PnP del PropertyPane solo cuando está en modo edición para mejorar el rendimiento: _myPropertyPaneEditModeChunck_
- Uso de los ficheros de localización: _personalPropertyPane_
- Uso del Code Splitting y del Lazy Load para la mejora del rendimiento: _lazyLoadHook_, _pnpControls_, _fluentUIControls_
- Uso de API Context de React (Paso de información entre componentes): _apiContextReact_
- Uso de React Route: _singlePageApp_
- Uso de controles de PnP: _pnpControls_
- Uso de controles de Fluent UI: _fluentUIControls_
- Uso de Theme Variants y Fluent ui (mixins @include ms- y variables $ms): _myThemeVariants_

y Además:
- Aplicar mejora de tiempo al hacer el bundle y serve 'spfx-fast-serve' (solución de Sergei Sergeev)
> 'npm run serve' sustituyendo a 'gulp serve' para hacer debug más rápido al usar el paquete de Sergei Sergeev (https://www.npmjs.com/package/spfx-fast-serve y https://github.com/s-KaiNet/spfx-fast-serve)
- Uso y prueba para la mejora de rendimiento con 'webpack-bundle-analyzer'


## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)


## Solution

Solution|Author(s)
--------|---------
SPFx Global | Alvaro Peich

## Version history

Version|Date|Comments
-------|----|--------
1.1|March 10, 2021|Update comment
1.0|January 29, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**
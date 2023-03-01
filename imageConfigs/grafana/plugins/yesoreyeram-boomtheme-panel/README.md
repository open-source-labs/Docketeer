# Boom Theme Panel

[![Build & Publish](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/workflows/Build%20&%20Publish/badge.svg)](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/actions?query=workflow%3A%22Build+%26+Publish%22)
[![Release](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/workflows/Release/badge.svg)](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/actions?query=workflow%3ARelease)

Theme switcher with custom styles / themes for grafana dashboards.

![image](https://user-images.githubusercontent.com/153843/99880461-5e1aa900-2c0b-11eb-9c28-3c80381f2504.png)
![image](https://user-images.githubusercontent.com/153843/99880502-a20dae00-2c0b-11eb-8355-c7c87bcb2f5c.png)

## Features

- Theme switcher
- Multiple themes per dashboard
- Theme builder
- External stylesheets support
- Add inline styles to themes to override styles
- Add many themes as possible without rebuilding / restarting grafana
- Users can change the themes without editing the dashboard
- Dashboard specific themes

## Creating Theme

Themes can be created with multiple building blocks like background image, base theme etc.

| Property                    | Description                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| Base theme                  | Themes can be built on top of default/dark/light theme. Default is **Default Theme**                     |
| Background image            | Optional property. Can be blank. If specified more than once, last wins. Value should be valid image URL |
| CSS url                     | External theme file. Should be valid CSS file URL                                                        |
| Custom Style / CSS Override | CSS Styles. Should be valid css                                                                          |
| Panel container BG          | Background color for the panels                                                                          |

## Supported Grafana version

This grafana plugin is tested with the following grafana versions, But other versions are also expected to work.

- Grafana version 8.x
- Grafana version 7.x
- Grafana version 6.x

## Notes

- When adding external stylesheets, make sure CORS enabled for those domains.

- To make panel invisible : Modify following theme panel settings:
  - transparent = true
  - title = ""
  - Disable Theme Picker using panel settings
  - Move this panel to the bottom of the dashboard
  - Adjust the height and width if required.

## Known issues / Limitations

- If any custom plugin is used, dark/light theme switch, base theme will not work for those custom plugins. Refer [this](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/issues/3) github issue

- Theme panel should be within view port. Otherwise, Grafana won't render the theme. Refer [this](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/issues/17)

## Installation Instructions

There are multiple ways to install this plugin into your grafana instance

### Download and extract zip file

Download the zip file from [github releases page](https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/releases) and extract into your grafana plugin folder. Then restart Grafana.

### Using grafana-cli

If you are using grafana-cli, execute the following command to install the plugin

```sh
grafana-cli plugins install yesoreyeram-boomtheme-panel
```

or for specific versions

```sh
grafana-cli --pluginUrl https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/releases/download/v0.2.1/yesoreyeram-boomtheme-panel-0.2.1.zip plugins install yesoreyeram-boomtheme-panel
```

### Using helm chart

If you use helm chart to provision grafana, use the following config to install the plugin

```yml
plugins:
  - yesoreyeram-boomtheme-panel
```

or for any specific versions

```yml
plugins:
  - https://github.com/yesoreyeram/yesoreyeram-boomtheme-panel/releases/download/v0.2.1/yesoreyeram-boomtheme-panel-0.2.1.zip;yesoreyeram-boomtheme-panel
```

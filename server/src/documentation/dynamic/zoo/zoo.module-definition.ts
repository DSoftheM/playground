import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ZooModuleOptions } from './ZooModuleOptions';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<ZooModuleOptions>()
  .setExtras<{ isGlobal: boolean }>({ isGlobal: false }, (definition, extras) => {
    return { ...definition, global: extras.isGlobal };
  })
  .build();

// ConfigurableModuleBuilder - Фабрика, которая позволяет создавать настраиваемые модули и предоставляет способ уменьшить большинство динамических модулей.

// Возвращает объект, состоящий из нескольких свойств, который позволяет легко создавать динамические настраиваемые модули. См. Интерфейс «ConfigurableModuleHost» для получения более подробной информации.

// ConfigurableModuleClass
// Класс, который представляет план/прототип для настраиваемого модуля. Этот класс предоставляет статические методы для построения динамических модулей. Их имена можно контролировать с помощью аргумента типа «MethodKey».
// Ваш класс модуля должен наследовать от этого класса, чтобы сделать статические методы доступными.

// MODULE_OPTIONS_TOKEN
// Токен для поставщика модулей. Можно использовать для введения «объекта опций» поставщикам, зарегистрированным в хост-модуле.

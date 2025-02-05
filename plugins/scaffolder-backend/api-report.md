## API Report File for "@backstage/plugin-scaffolder-backend"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="node" />

import { CatalogApi } from '@backstage/catalog-client';
import { Config } from '@backstage/config';
import { ContainerRunner } from '@backstage/backend-common';
import { createPullRequest } from 'octokit-plugin-create-pull-request';
import express from 'express';
import { JsonObject } from '@backstage/config';
import { JsonValue } from '@backstage/config';
import { Logger as Logger_2 } from 'winston';
import { PluginDatabaseManager } from '@backstage/backend-common';
import { Schema } from 'jsonschema';
import { ScmIntegrationRegistry } from '@backstage/integration';
import { ScmIntegrations } from '@backstage/integration';
import { TemplateEntityV1beta2 } from '@backstage/catalog-model';
import { UrlReader } from '@backstage/backend-common';
import { Writable } from 'stream';

// @public (undocumented)
export type ActionContext<Input extends InputBase> = {
  baseUrl?: string;
  logger: Logger_2;
  logStream: Writable;
  token?: string | undefined;
  workspacePath: string;
  input: Input;
  output(name: string, value: JsonValue): void;
  createTemporaryDirectory(): Promise<string>;
};

// @public
export class CatalogEntityClient {
  constructor(catalogClient: CatalogApi);
  findTemplate(
    templateName: string,
    options?: {
      token?: string;
    },
  ): Promise<TemplateEntityV1beta2>;
}

// @public (undocumented)
export const createBuiltinActions: (options: {
  reader: UrlReader;
  integrations: ScmIntegrations;
  catalogClient: CatalogApi;
  containerRunner: ContainerRunner;
  config: Config;
}) => TemplateAction<any>[];

// @public (undocumented)
export function createCatalogRegisterAction(options: {
  catalogClient: CatalogApi;
  integrations: ScmIntegrations;
}): TemplateAction<any>;

// @public (undocumented)
export function createCatalogWriteAction(): TemplateAction<any>;

// @public
export function createDebugLogAction(): TemplateAction<any>;

// @public (undocumented)
export function createFetchCookiecutterAction(options: {
  reader: UrlReader;
  integrations: ScmIntegrations;
  containerRunner: ContainerRunner;
}): TemplateAction<any>;

// @public (undocumented)
export function createFetchPlainAction(options: {
  reader: UrlReader;
  integrations: ScmIntegrations;
}): TemplateAction<any>;

// @public (undocumented)
export function createFetchTemplateAction(options: {
  reader: UrlReader;
  integrations: ScmIntegrations;
}): TemplateAction<any>;

// @public (undocumented)
export const createFilesystemDeleteAction: () => TemplateAction<any>;

// @public (undocumented)
export const createFilesystemRenameAction: () => TemplateAction<any>;

// @public (undocumented)
export function createPublishAzureAction(options: {
  integrations: ScmIntegrationRegistry;
  config: Config;
}): TemplateAction<any>;

// @public (undocumented)
export function createPublishBitbucketAction(options: {
  integrations: ScmIntegrationRegistry;
  config: Config;
}): TemplateAction<any>;

// @public
export function createPublishFileAction(): TemplateAction<any>;

// @public (undocumented)
export function createPublishGithubAction(options: {
  integrations: ScmIntegrationRegistry;
  config: Config;
}): TemplateAction<any>;

// @public (undocumented)
export const createPublishGithubPullRequestAction: ({
  integrations,
  clientFactory,
}: CreateGithubPullRequestActionOptions) => TemplateAction<any>;

// @public (undocumented)
export function createPublishGitlabAction(options: {
  integrations: ScmIntegrationRegistry;
  config: Config;
}): TemplateAction<any>;

// @public (undocumented)
export function createRouter(options: RouterOptions): Promise<express.Router>;

// @public (undocumented)
export const createTemplateAction: <
  Input extends Partial<{
    [name: string]: JsonValue | Partial<JsonObject> | undefined;
  }>
>(
  templateAction: TemplateAction<Input>,
) => TemplateAction<any>;

// @public (undocumented)
export function fetchContents({
  reader,
  integrations,
  baseUrl,
  fetchUrl,
  outputPath,
}: {
  reader: UrlReader;
  integrations: ScmIntegrations;
  baseUrl?: string;
  fetchUrl?: JsonValue;
  outputPath: string;
}): Promise<void>;

// @public (undocumented)
export interface RouterOptions {
  // (undocumented)
  actions?: TemplateAction<any>[];
  // (undocumented)
  catalogClient: CatalogApi;
  // (undocumented)
  config: Config;
  // (undocumented)
  containerRunner: ContainerRunner;
  // (undocumented)
  database: PluginDatabaseManager;
  // (undocumented)
  logger: Logger_2;
  // (undocumented)
  reader: UrlReader;
  // (undocumented)
  taskWorkers?: number;
}

// @public (undocumented)
export const runCommand: ({
  command,
  args,
  logStream,
}: RunCommandOptions) => Promise<void>;

// @public (undocumented)
export type TemplateAction<Input extends InputBase> = {
  id: string;
  description?: string;
  schema?: {
    input?: Schema;
    output?: Schema;
  };
  handler: (ctx: ActionContext<Input>) => Promise<void>;
};

// @public (undocumented)
export class TemplateActionRegistry {
  // (undocumented)
  get(actionId: string): TemplateAction<any>;
  // (undocumented)
  list(): TemplateAction<any>[];
  // (undocumented)
  register<Parameters extends InputBase>(
    action: TemplateAction<Parameters>,
  ): void;
}

// (No @packageDocumentation comment for this package)
```

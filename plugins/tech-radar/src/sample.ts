/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import * as dotenv from 'dotenv';

import {
  RadarRing,
  RadarQuadrant,
  RadarEntry,
  TechRadarLoaderResponse,
  TechRadarApi,
} from './api';


const rings = new Array<RadarRing>();

const quadrants = new Array<RadarQuadrant>();

const entries = new Array<RadarEntry>();

const loadRings = async (): Promise<any> => {

  rings.push({ id: 'evite', name: 'Evite', color: '#93c47d' });
  rings.push({ id: 'experimente', name: 'Experimente', color: '#93d2c2' });
  rings.push({ id: 'adote', name: 'Adote', color: '#fbdb84' });
  rings.push({ id: 'avalie', name: 'Avalie', color: '#efafa9' });

  return new Promise(resolve => {
    resolve(rings);
  });
};

const loadQuadrants = async (): Promise<any> => {

  quadrants.push({ id: 'linguagens-de-programacao-e-frameworks', name: 'Linguagens de Programação e Frameworks' });
  quadrants.push({ id: 'ferramentas', name: 'Ferramentas' });
  quadrants.push({ id: 'tecnicas', name: 'Técnicas' });
  quadrants.push({ id: 'plataformas', name: 'Plataformas' });

  return new Promise(resolve => {
    resolve(quadrants);
  });
};

const loadEntries = async (): Promise<any> => {
  const data = 'Django,django,linguagens-de-programacao-e-frameworks,evite,Framework para desenvolvimento python \n Flyway,flyway,ferramentas,experimente,Ferramenta de automação de migrações de banco de dados. '
  const separated = data.split('\n');
  console.log('TESTE', separated)
  for (const blipRaw of separated) {
    const blipArray = blipRaw.split(',');
    const blip = {
      title: blipArray[0],
      id: blipArray[1],
      quadrant: blipArray[2],
      ring: blipArray[3],
      description: blipArray[4],
    };
    if (!blip.quadrant) {
      continue;
    }

    const blipEntry = {
      timeline: [
        {
          moved: 0,
          ringId: blip.ring,
          date: new Date('2020-08-06'),
          description: blip.description,
        },
      ],
      url: '#',
      key: blip.id,
      id: blip.id,
      title: blip.title,
      quadrant: blip.quadrant,
      description: blip.description,
    };
    entries.push(blipEntry);
  }

  return new Promise(resolve => {
    resolve(entries);
  });
};

export const mock: TechRadarLoaderResponse = {
  entries,
  quadrants,
  rings,
};

export class SampleTechRadarApi implements TechRadarApi {
  async load() {
    await loadRings();
    await loadQuadrants();
    await loadEntries();

    return mock;
  }
}
  

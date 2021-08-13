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

import axios from 'axios';

const blipsSheet = '';
const ringSheet = '';
const quadrantSheet = '';

const rings = new Array<RadarRing>();

const quadrants = new Array<RadarQuadrant>();

const entries = new Array<RadarEntry>();

const loadRings = async (): Promise<any> => {
  const { data } = await axios.get(ringSheet);
  const separated = data.split('\n');

  const firstRing = getElementSpecs(separated[1]);
  const secondRing = getElementSpecs(separated[2]);
  const thirdRing = getElementSpecs(separated[3]);
  const fourthRing = getElementSpecs(separated[4]);

  rings.push({ id: firstRing.id, name: firstRing.title, color: '#93c47d' });
  rings.push({ id: secondRing.id, name: secondRing.title, color: '#93d2c2' });
  rings.push({ id: thirdRing.id, name: thirdRing.title, color: '#fbdb84' });
  rings.push({ id: fourthRing.id, name: fourthRing.title, color: '#efafa9' });

  return new Promise(resolve => {
    resolve(rings);
  });
};

const loadQuadrants = async (): Promise<any> => {
  const { data } = await axios.get(quadrantSheet);
  const separated = data.split('\n');

  const firstQuadrants = getElementSpecs(separated[1]);
  const secondQuadrants = getElementSpecs(separated[2]);
  const thirdQuadrants = getElementSpecs(separated[3]);
  const fourthQuadrants = getElementSpecs(separated[4]);

  quadrants.push({ id: firstQuadrants.id, name: firstQuadrants.title });
  quadrants.push({ id: secondQuadrants.id, name: secondQuadrants.title });
  quadrants.push({ id: thirdQuadrants.id, name: thirdQuadrants.title });
  quadrants.push({ id: fourthQuadrants.id, name: fourthQuadrants.title });

  return new Promise(resolve => {
    resolve(quadrants);
  });
};

const loadEntries = async (): Promise<any> => {
  const { data } = await axios.get(blipsSheet);
  const separated = data.split('\n');
  separated.shift();
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
function getElementSpecs(separated: any) {
  const sparetedContent = separated.split(',');
  return {
    id: sparetedContent[1].replace('\r', ''),
    title: sparetedContent[0],
  };
}

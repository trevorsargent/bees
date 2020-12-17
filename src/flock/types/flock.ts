import { SmartMap } from '../../lib/smartMap'
import { C3 } from '../../lib/v3'
import { Bee } from './bee'
import { init } from '../sim/init'
import { tick } from '../sim/tick'

export class Flock {
  public readonly context: Context

  constructor() {
    this.context = init()
  }

  bees() {
    return this.context.bees
  }

  update(params?: ParamSet<number>) {
    if (params) {
      Object.assign(this.context.params, params)
    }

    tick(this.context)
  }
}

export type ParamSet<T> = {
  targetPopulation: T
  viewDistance: T
  viewAngle: T
  maxSpeed: T
  cohesiveForce: T
  separationForce: T
  alignmentForce: T
  bounds: C3<T>
}

export interface Context {
  bees: Bee[]
  // canvas: Canvas
  params: ParamSet<number>
  debugOptions: {
    showViewArea: boolean
    showVelocityVectors: boolean
  }
  zones: ZoneCache
}

export type ZoneCache = SmartMap<
  number,
  SmartMap<number, SmartMap<number, Set<Bee>>>
>
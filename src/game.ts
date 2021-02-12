import { MovingPlatform } from './movingPlatform'
import { TriggeredPlatform } from './triggeredPlatform'
import { PathedPlatform } from './pathedPlatform'
import * as utils from '@dcl/ecs-scene-utils'
import { Coin } from './coin'

// Base
const base = new Entity()
base.addComponent(new GLTFShape('models/baseLight.glb'))
base.addComponent(new Transform())
engine.addEntity(base)

// Static platform
const staticPlatform = new Entity()
staticPlatform.addComponent(new GLTFShape('models/staticPlatforms.glb'))
staticPlatform.addComponent(new Transform())
engine.addEntity(staticPlatform)

// Moving platform
const horizontalMovingPlatform = new MovingPlatform(
  new GLTFShape('models/movingPlatform.glb'),
  new Vector3(2, 1.5, 6.5),
  new Vector3(2, 1.5, 12),
  3
)
const verticalMovingPlatform = new MovingPlatform(
  new GLTFShape('models/movingPlatform.glb'),
  new Vector3(4, 1.5, 14),
  new Vector3(4, 4, 14),
  2
)

// Triggered platform
let platformTriggerBox = new utils.TriggerBoxShape(
  new Vector3(2, 2, 2),
  new Vector3(0, 1.7, 0)
) // Modified to match platform size
const triggeredMovingPlatform = new TriggeredPlatform(
  new GLTFShape('models/triggerPlatform.glb'),
  new Transform({ position: new Vector3(14, 4, 12) }),
  platformTriggerBox
)

// Pathed platform
let path = [
  new Vector3(6.5, 7, 4),
  new Vector3(6.5, 7, 12),
  new Vector3(6.5, 10.5, 12),
  new Vector3(6.5, 10.5, 4),
]
const pathedPlatform = new PathedPlatform(
  new GLTFShape('models/movingPlatform.glb'),
  path,
  10
)

// Coin
let coinTriggerBox = new utils.TriggerBoxShape(
  new Vector3(1.5, 3, 1.5),
  new Vector3(0, 1, 0)
) // Trigger shape for coin
const coin = new Coin(
  new GLTFShape('models/starCoin.glb'),
  new Transform({ position: new Vector3(9, 12.75, 8) }),
  coinTriggerBox
)

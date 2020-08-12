import utils from "../node_modules/decentraland-ecs-utils/index"
import { TriggerBoxShape } from "../node_modules/decentraland-ecs-utils/triggers/triggerSystem"

/**
 * Sound is a separated from the coin entity so that you can 
 * still hear it even when the coin is removed from the engine.
 */
const coinPickupSound = new Entity()
coinPickupSound.addComponent(new Transform())
coinPickupSound.getComponent(Transform).position = Camera.instance.position
coinPickupSound.addComponent(new AudioSource(new AudioClip("sounds/coinPickup.mp3")))
engine.addEntity(coinPickupSound)

export class Coin extends Entity {
  constructor(model: GLTFShape, transform: Transform, triggerShape: TriggerBoxShape) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)

    // Create trigger for coin
    this.addComponent(
      new utils.TriggerComponent(
        triggerShape, null, null, null, null,
        () => { // Camera enter
          this.getComponent(Transform).scale.setAll(0)
          coinPickupSound.getComponent(AudioSource).playOnce()
        },
        () => { // Camera exit
          engine.removeEntity(this)
        }
      )
    )
  }
}

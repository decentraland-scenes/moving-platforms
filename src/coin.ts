import * as utils from '@dcl/ecs-scene-utils'

/**
 * Sound is a separated from the coin entity so that you can
 * still hear it even when the coin is removed from the engine.
 */
const coinPickupSound = new Entity()
coinPickupSound.addComponent(new Transform())
coinPickupSound.setParent(Attachable.AVATAR)
coinPickupSound.addComponent(
  new AudioSource(new AudioClip('sounds/coinPickup.mp3'))
)
engine.addEntity(coinPickupSound)

export class Coin extends Entity {
  constructor(
    model: GLTFShape,
    transform: Transform,
    triggerShape: utils.TriggerBoxShape
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)

    // Create trigger for coin
    this.addComponent(
      new utils.TriggerComponent(triggerShape, {
        onCameraEnter: () => {
          // Camera enter
          this.getComponent(Transform).scale.setAll(0)
          coinPickupSound.getComponent(AudioSource).playOnce()
        },
        onCameraExit: () => {
          // Camera exit
          engine.removeEntity(this)
        },
      })
    )
  }
}

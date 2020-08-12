import utils from "../node_modules/decentraland-ecs-utils/index"
import { ToggleState } from "../node_modules/decentraland-ecs-utils/toggle/toggleComponent"
import { TriggerBoxShape } from "../node_modules/decentraland-ecs-utils/triggers/triggerSystem"

export class TriggeredPlatform extends Entity {
  constructor(model: GLTFShape, transform: Transform, triggerShape: TriggerBoxShape) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)

    // Create trigger for entity
    this.addComponent(
      new utils.TriggerComponent(
        triggerShape, null, null, null, null,
        () => { 
          this.getComponent(utils.ToggleComponent).toggle() 
        },
        () => { 
          this.getComponent(utils.ToggleComponent).toggle() 
        }
      )
    )

    this.addComponent(
      new utils.ToggleComponent(utils.ToggleState.Off, (value: ToggleState) => {
        // Move the platform to the end position once the player steps onto the platform
        if (value == utils.ToggleState.On) {
          this.addComponentOrReplace(new utils.MoveTransformComponent(new Vector3(14, 4, 12), new Vector3(14, 4, 4), 3))
        } else {
          // Move the platform to the start position once the player falls off or leaves the platform
          this.addComponentOrReplace(new utils.MoveTransformComponent(this.getComponent(Transform).position, new Vector3(14, 4, 12), 1.5))
        }
      })
    )
  }
}

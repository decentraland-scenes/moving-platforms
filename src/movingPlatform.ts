import utils from "../node_modules/decentraland-ecs-utils/index"
import { ToggleState } from "../node_modules/decentraland-ecs-utils/toggle/toggleComponent"

export class MovingPlatform extends Entity {
  constructor(model: GLTFShape, startPos: Vector3, endPos: Vector3, time: number) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(new Transform())

    // Move the platform back and forth between start and end positions
    this.addComponent(
      new utils.ToggleComponent(utils.ToggleState.Off, (value: ToggleState) => {
        if (value == utils.ToggleState.On) {
          this.addComponentOrReplace(
            new utils.MoveTransformComponent(startPos, endPos, time, () => {
              this.getComponent(utils.ToggleComponent).toggle()
            })
          )
        } else {
          this.addComponentOrReplace(
            new utils.MoveTransformComponent(endPos, startPos, time, () => {
              this.getComponent(utils.ToggleComponent).toggle()
            })
          )
        }
      })
    )
    this.getComponent(utils.ToggleComponent).toggle()
  }
}

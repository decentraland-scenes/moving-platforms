import utils from "../node_modules/decentraland-ecs-utils/index"
import { ToggleState } from "../node_modules/decentraland-ecs-utils/toggle/toggleComponent"

export class PathedPlatform extends Entity {
  constructor(model: GLTFShape, path: Vector3[], time: number) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(new Transform())

    // Move the platform along a path before looping back again
    this.addComponent(
      new utils.ToggleComponent(utils.ToggleState.Off, (value: ToggleState) => {
        if (value == utils.ToggleState.On) {
          this.addComponentOrReplace(
            new utils.FollowPathComponent(path, time, () => {
              this.getComponent(utils.ToggleComponent).toggle()
            })
          )
        } else {
          this.addComponentOrReplace(
            new utils.MoveTransformComponent(path[path.length - 1], path[0], time / path.length, () => {
              this.getComponent(utils.ToggleComponent).toggle()
            })
          )
        }
      })
    )
    this.getComponent(utils.ToggleComponent).toggle()
  }
}

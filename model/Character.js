import { v4 as uuidv4 } from 'uuid'

class Character {
  constructor(name, color) {
    this.setId(uuidv4())
    this.setName(name)
    this.setColor(color)
  }

  get getName() {
    return this.name
  }

  /**
   * @param {(arg0: string) => void} name
   */
  set setName(name) {
    this.name = name
  }

  get getId() {
    return this.id
  }

  /**
   * @param {(arg0: string) => void} id
   */
  set setId(id) {
    this.id = id
  }

  get getColor() {
    return this.color
  }

  /**
   * @param {(arg0: string) => void} color
   */
  set setColor(color) {
    this.color = color
  }
}

export default Character

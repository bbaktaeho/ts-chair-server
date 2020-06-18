import { PostureDTO } from "../interface/PostureDTO";
import Posture from "../models/posture";
import { UserDTO } from "../interface/UserDTO";
export default class PostureService {
  constructor() {}

  private PostureServiceReturn(
    success: boolean,
    result: any,
    statusCode: number
  ) {
    return { success, result, statusCode };
  }

  public async save(postures: PostureDTO, user: UserDTO): Promise<any> {
    let result: { success: boolean; result: any; statusCode: number } | any;
    try {
      const newPostures = await Posture.create({
        UserId: user.id,
        ...postures,
      });
      result = this.PostureServiceReturn(true, newPostures, 200);
    } catch (saveError) {
      result = this.PostureServiceReturn(false, saveError.message, 500);
    } finally {
      return result;
    }
  }
}

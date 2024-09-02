import axios from "axios";

const fetchTodoList = async (status: string, offset: number, limit: number) => {
  // TODO, DOING, DONE
  try {
    const response = await axios.get(
      `https://todo-list-api-mfchjooefq-as.a.run.app/todo-list?status=${status}&offset=${offset}&limit=${limit}&sortBy=createdAt&isAsc=true`,
    );

    if (response.status === 200) {
      console.log(response.data);

      return {
        message: "success",
        data: response.data.tasks,
        isLastPage: offset + 1 === response.data.totalPages ? true : false,
      };
    } else {
      console.error(response.data);

      return { message: response.data, data: null };
    }
  } catch (e: any) {
    console.error(e.message);

    return { message: e.message, data: null };
  }
}

export { fetchTodoList };

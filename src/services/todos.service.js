import httpService from "./http.service";
const todosEndpoint = "todos/";

const todosService = {
  create: async (payload) => {
    const { data } = await httpService.put(
      todosEndpoint + payload._id,
      payload
    );
    return data;
  },
  edit: async (payload) => {
    const { data } = await httpService.patch(
      todosEndpoint + payload._id,
      payload
    );
    return data;
  },
  fetchAll: async (userId) => {
    const { data } = await httpService.get(todosEndpoint, {
      params: { orderBy: `"userId"`, equalTo: `"${userId}"` },
    });
    return data;
  },
  remove: async (todoId) => {
    const { data } = await httpService.delete(todosEndpoint + todoId);
    return data;
  },
};

export default todosService;

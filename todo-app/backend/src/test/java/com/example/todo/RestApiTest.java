package com.example.todo;

import com.example.openapi.OpenApiValidator;
import nablarch.fw.web.HttpResponse;
import nablarch.fw.web.RestMockHttpRequest;
import nablarch.test.core.http.SimpleRestTestSupport;
import org.hamcrest.Matchers;
import org.junit.ClassRule;
import org.junit.Test;
import org.openapi4j.core.validation.ValidationException;

import java.nio.file.Paths;
import java.util.Collections;
import java.util.Map;
import javax.ws.rs.core.MediaType;
import static com.jayway.jsonpath.matchers.JsonPathMatchers.hasJsonPath;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;

public class RestApiTest extends SimpleRestTestSupport {

  public static OpenApiValidator openApiValidator =
      new OpenApiValidator(Paths.get("rest-api-specification/openapi.yaml"));

  @Test
  public void RESTAPIでToDo一覧が取得できる() throws ValidationException {
    RestMockHttpRequest request = get("/api/todos");
    HttpResponse response = sendRequest(request);

    assertStatusCode("ToDo一覧の取得", HttpResponse.Status.OK, response);

    String responseBody = response.getBodyString();

    assertThat(responseBody, hasJsonPath("$", hasSize(2)));

    assertThat(responseBody, hasJsonPath("$[0].id", equalTo(2001)));
    assertThat(responseBody, hasJsonPath("$[0].text", equalTo("やること１")));
    assertThat(responseBody, hasJsonPath("$[0].completed", equalTo(true)));

    assertThat(responseBody, hasJsonPath("$[1].id", equalTo(2002)));
    assertThat(responseBody, hasJsonPath("$[1].text", equalTo("やること２")));
    assertThat(responseBody, hasJsonPath("$[1].completed", equalTo(false)));

    openApiValidator.validate("getTodos", request, response);
  }

  @Test
  public void RESTAPIでToDoを登録できる() throws Exception {
    RestMockHttpRequest request = post("/api/todos")
        .setHeader("Content-Type", MediaType.APPLICATION_JSON).setBody(Map.of("text", "テストする"));
    HttpResponse response = sendRequest(request);

    assertStatusCode("ToDoの登録", HttpResponse.Status.OK, response);

    assertThat(response.getBodyString(), hasJsonPath("$.id", Matchers.notNullValue()));
    assertThat(response.getBodyString(), hasJsonPath("$.text", equalTo("テストする")));
    assertThat(response.getBodyString(), hasJsonPath("$.completed", equalTo(false)));

    openApiValidator.validate("postTodo", request, response);
  }

  @Test
  public void ToDo登録時にtext項目が無い場合_登録に失敗して400になる() {
    RestMockHttpRequest request = post("/api/todos")
        .setHeader("Content-Type", MediaType.APPLICATION_JSON).setBody(Collections.emptyMap());
    HttpResponse response = sendRequest(request);

    assertStatusCode("ToDoの登録", HttpResponse.Status.BAD_REQUEST, response);
  }

  @Test
  public void RESTAPIでToDoの状態を更新できる() throws Exception {
    RestMockHttpRequest request = put("/api/todos/2003")
        .setHeader("Content-Type", MediaType.APPLICATION_JSON).setBody(Map.of("completed", true));
    HttpResponse response = sendRequest(request);

    assertStatusCode("ToDoのステータス更新", HttpResponse.Status.OK, response);

    assertThat(response.getBodyString(), hasJsonPath("$.id", equalTo(2003)));
    assertThat(response.getBodyString(), hasJsonPath("$.text", equalTo("やること３")));
    assertThat(response.getBodyString(), hasJsonPath("$.completed", equalTo(true)));

    openApiValidator.validate("putTodo", request, response);
  }
}
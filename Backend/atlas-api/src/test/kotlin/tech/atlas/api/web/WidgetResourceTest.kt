/*
 * Copyright (c) 2021 Pixel Rocket
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package tech.atlas.api.web
//
//import com.fasterxml.jackson.core.type.TypeReference
//import common.ServerTest
//import io.ktor.client.*
//import io.ktor.client.features.websocket.*
//import io.ktor.http.cio.websocket.*
//import io.restassured.RestAssured.*
//import io.restassured.http.ContentType
//import kotlinx.coroutines.Dispatchers
//import kotlinx.coroutines.runBlocking
//import kotlinx.coroutines.withContext
//import dev.cubesuite.api.model.ChangeType
//import dev.cubesuite.api.model.NewWidget
//import dev.cubesuite.api.model.Widget
//import dev.cubesuite.api.model.WidgetNotification
//import org.assertj.core.api.Assertions.assertThat
//import org.junit.jupiter.api.Nested
//import org.junit.jupiter.api.Test
//import dev.cubesuite.api.util.JsonMapper.defaultMapper
//
//class WidgetResourceTest: ServerTest() {
//
//    @Test
//    fun testCreateWidget() {
//        // when
//        val newWidget = NewWidget(null, "widget1", 12)
//        val created = addWidget(newWidget)
//
//        val retrieved = get("/widget/{id}", created.id)
//                .then()
//                .extract().to<Widget>()
//
//        // then
//        assertThat(created.name).isEqualTo(newWidget.name)
//        assertThat(created.quantity).isEqualTo(newWidget.quantity)
//
//        assertThat(created).isEqualTo(retrieved)
//    }
//
//    @Test
//    fun testGetWidgets() {
//        // when
//        val widget1 = NewWidget(null, "widget1", 10)
//        val widget2 = NewWidget(null, "widget2", 5)
//        addWidget(widget1)
//        addWidget(widget2)
//
//        val widgets = get("/widget")
//                .then()
//                .statusCode(200)
//                .extract().to<List<Widget>>()
//
//        assertThat(widgets).hasSize(2)
//        assertThat(widgets).extracting("name").containsExactlyInAnyOrder(widget1.name, widget2.name)
//        assertThat(widgets).extracting("quantity").containsExactlyInAnyOrder(widget1.quantity, widget2.quantity)
//    }
//
//    @Test
//    fun testUpdateWidget() {
//        // when
//        val widget1 = NewWidget(null, "widget1", 10)
//        val saved = addWidget(widget1)
//
//        // then
//        val update = NewWidget(saved.id, "updated", 46)
//        val updated = given()
//                .contentType(ContentType.JSON)
//                .body(update)
//                .When()
//                .put("/widget")
//                .then()
//                .statusCode(200)
//                .extract().to<Widget>()
//
//        assertThat(updated).isNotNull
//        assertThat(updated.id).isEqualTo(update.id)
//        assertThat(updated.name).isEqualTo(update.name)
//        assertThat(updated.quantity).isEqualTo(update.quantity)
//    }
//
//    @Test
//    fun testDeleteWidget() {
//        // when
//        val newWidget = NewWidget(null, "widget1", 12)
//        val created = addWidget(newWidget)
//
//        // then
//        delete("/widget/{id}", created.id)
//                .then()
//                .statusCode(200)
//
//        get("/widget/{id}", created.id)
//                .then()
//                .statusCode(404)
//    }
//
//    @Nested
//    inner class ErrorCases {
//
//        @Test
//        fun testUpdateInvalidWidget() {
//            val updatedWidget = NewWidget(-1, "invalid", -1)
//            given()
//                    .contentType(ContentType.JSON)
//                    .body(updatedWidget)
//                    .When()
//                    .put("/widget")
//                    .then()
//                    .statusCode(404)
//        }
//
//        @Test
//        fun testDeleteInvalidWidget() {
//            delete("/widget/{id}", "-1")
//                    .then()
//                    .statusCode(404)
//        }
//
//        @Test
//        fun testGetInvalidWidget() {
//            get("/widget/{id}", "-1")
//                    .then()
//                    .statusCode(404)
//        }
//
//    }
//
//    @Nested
//    inner class WebSocketNotifications {
//        @Test
//        fun testGetNotificationForWidgetAdd() {
//            // when
//            val newWidget = NewWidget(null, "widgetForSocket", 23)
//
//            val client = HttpClient {
//                install(WebSockets)
//            }
//
//            runBlocking {
//                client.webSocket(host = "localhost", port = 8080, path = "/updates") {
//                    val created = addWidget(newWidget)
//
//                    val frame = incoming.receive()
//                    assertThat(frame).isInstanceOf(Frame.Text::class.java)
//                    val textFrame = frame as Frame.Text
//                    val value = withContext(Dispatchers.IO) {
//                        defaultMapper.readValue(textFrame.readText(),
//                            object : TypeReference<WidgetNotification>() {})
//                    }
//                    assertThat(value.type).isEqualTo(ChangeType.CREATE)
//                    assertThat(value.entity).isNotNull.also {
//                        it.extracting(Widget::name.name).isEqualTo(newWidget.name)
//                        it.extracting(Widget::id.name).isEqualTo(created.id)
//                    }
//
//                    close(CloseReason(CloseReason.Codes.NORMAL, "Finished test"))
//                }
//            }
//
//
//        }
//    }
//
//    private fun addWidget(widget: NewWidget): Widget {
//        return given()
//                .contentType(ContentType.JSON)
//                .body(widget)
//                .When()
//                .post("/widget")
//                .then()
//                .statusCode(201)
//                .extract().to()
//    }
//
//}
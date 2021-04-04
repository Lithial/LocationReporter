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

package tech.atlas.api.web.api.v1

import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import tech.atlas.api.model.User
import tech.atlas.api.service.UserService
import tech.atlas.api.util.ApiMessage

fun Route.users(userService: UserService) {
    route("/users") {
        get("/{id}") {
            val user = userService.getUser(call.parameters["id"]!!.toInt())
            if(user != null) call.respond(user)
            else call.respond(HttpStatusCode.NotFound,
                ApiMessage(404, "User not found with id \"${call.parameters["id"]!!.toInt()}\"")
            )
        }

        authenticate("api") {

            patch("/{id}") {
                val user = call.authentication.principal<User>()
                val existingUser = userService.getUser(call.parameters["id"]!!.toInt())
                if (existingUser != null) {
                    if (user != null && user.admin == true) {
                        val data = call.receive<User>()
                        if (data.id != call.parameters["id"]!!.toInt()) {
                            call.respond(
                                HttpStatusCode.BadRequest,
                                ApiMessage(400, "Bad Request: User id mismatch.")
                            )
                        } else {
                            call.respond(userService.updateUser(data)!!)
                        }
                    } else {
                        call.respond(
                            HttpStatusCode.Forbidden,
                            ApiMessage(403, "Only admins can modify users.")
                        )
                    }
                } else {
                    call.respond(
                        HttpStatusCode.NotFound,
                        ApiMessage(404, "User not found with id \"${call.parameters["id"]!!.toInt()}\"")
                    )
                }
            }

            delete("/{id}") {
                val user = call.authentication.principal<User>()
                if(user != null &&( user.admin == true || user.id == call.parameters["id"]!!.toInt())) {
                    val removed = userService.deleteUser(user.id!!)
                    if(removed) call.respond(ApiMessage(200, "User deleted"))
                    else call.respond(HttpStatusCode.NotFound,
                        ApiMessage(404, "User not found with id \"${call.parameters["id"]!!}\"")
                    )
                } else {
                    call.respond(HttpStatusCode.Forbidden,
                        ApiMessage(403, "A user can only be deleted by an admin or by the user themselves.")
                    )
                }
            }
        }
    }
}
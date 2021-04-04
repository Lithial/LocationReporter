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

import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.client.*
import io.ktor.client.engine.apache.*
import io.ktor.client.features.json.*
import io.ktor.client.features.json.serializer.*
import io.ktor.client.request.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import tech.atlas.api.auth.JwtAuth
import tech.atlas.api.model.DiscordUser
import tech.atlas.api.model.NewAsset
import tech.atlas.api.model.User
import tech.atlas.api.model.Users
import tech.atlas.api.service.AssetService
import tech.atlas.api.service.UserService
import tech.atlas.api.util.ApiMessage
import java.util.*

fun Route.login(userService: UserService, assetService: AssetService) {
    authenticate("discord") {
        get("/login") {
            if(call.request.queryParameters.contains("error")) {
                call.respond(ApiMessage(401, "Login failed"))
            }
            val principal = call.authentication.principal<OAuthAccessTokenResponse.OAuth2>()
            if(principal != null) {
                withContext(Dispatchers.Default) {
                    val user = handleDiscordUser(userService, assetService, principal)
                    call.respond(mapOf("token" to JwtAuth.generateToken(user)))
                }
            } else {
                call.respond(ApiMessage(400, "Bad request"))
            }
        }
    }
}

private suspend fun handleDiscordUser(userService: UserService, assetService: AssetService, principal: OAuthAccessTokenResponse.OAuth2): User {
    val client = HttpClient(Apache) {
        install(JsonFeature) {
            serializer = KotlinxSerializer(
                kotlinx.serialization.json.Json {
                    isLenient = false
                    ignoreUnknownKeys = true
                    allowSpecialFloatingPointValues = true
                    useArrayPolymorphism = false
                }
            )
        }
    }

    val discordUser = client.get<DiscordUser>("https://discord.com/api/v8/users/@me") {
        header("Authorization", "Bearer ${principal.accessToken}")
    }
    val avatarUrl = if(discordUser.avatar == null) "https://cdn.discordapp.com/embed/avatars/${discordUser.discriminator.toInt() % 5}.png"
        else "https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png"
    val avatar: ByteArray = client.get(avatarUrl)

    val assetHash = assetService.addAsset(
        NewAsset(
            null,
            null,
            Base64.getEncoder().encodeToString(avatar)
        )
    ).hash

    val existingUser = userService.getUserForDiscord(discordUser)
    val user = User(
        id = existingUser?.id,
        name = discordUser.username,
        discord = discordUser.id,
        github = "",
        friends = emptyArray(),
        friendRequestsIn = emptyArray(),
        friendRequestsOut = emptyArray(),
        avatar = assetHash,
        admin = existingUser?.admin == true,
    )

    client.close()
    return userService.updateUser(user)!!
}
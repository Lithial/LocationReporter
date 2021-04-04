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
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.*
import io.ktor.utils.io.*
import tech.atlas.api.model.NewAsset
import tech.atlas.api.service.AssetService
import tech.atlas.api.util.ApiMessage
import java.security.MessageDigest
import java.util.*

fun Route.assets(assetService: AssetService) {

    route("/assets") {
        get("/{hash}.png") {
            val hash = call.parameters["hash"]!!

            val asset = assetService.getAssetByHash(hash) ?: return@get call.respond(ApiMessage(404, "asset not found"))
            return@get call.respondBytes(Base64.getDecoder().decode(asset.content), ContentType.Image.PNG)
        }

        authenticate("api") {
            post("/") {
                if(call.request.contentType() == ContentType.Image.PNG
                    || call.request.contentType() == ContentType.Image.JPEG) {

                    val channel: ByteReadChannel = call.receiveChannel()
                    channel.awaitContent()
                    val bytes: ByteArray = channel.toByteArray()

                    val imageBase64: String = Base64.getEncoder().encodeToString(bytes)
                    val imageHash: String = bytes.md5

                    val asset = assetService.getAssetByHash(imageHash) ?: assetService.addAsset(
                        NewAsset(
                        id = null,
                        hash = imageHash,
                        content = imageBase64
                    )
                    )

                    call.respond(asset)
                } else {
                    call.respond(HttpStatusCode.BadRequest, ApiMessage(404, "Bad request"))
                }
            }
        }
    }
}

private val ByteArray.md5: String
    get() {
        val bytes = MessageDigest.getInstance("md5").digest(this)
        return bytes.joinToString("") {
            "%02x".format(it)
        }
    }
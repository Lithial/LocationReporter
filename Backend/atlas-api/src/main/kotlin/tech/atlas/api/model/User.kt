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

package tech.atlas.api.model

import io.ktor.auth.*
import kotlinx.serialization.Serializable
import tech.atlas.api.util.array
import org.jetbrains.exposed.sql.IntegerColumnType
import org.jetbrains.exposed.sql.StringColumnType
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.VarCharColumnType

object Users : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name",255)
    val discord = varchar("discord", 255).nullable()
    val github = varchar("github", 255).nullable()
    val avatar = varchar("avatar", 32)
    val friends = array<String>("friends", IntegerColumnType())
    val friendRequestsIn = array<String>("friends", IntegerColumnType())
    val friendRequestsOut = array<String>("friends", IntegerColumnType())
    val admin = bool("admin")
}

@Serializable
data class User(
    val id: Int?,
    val name: String?,
    val discord: String?,
    val github: String?,
    val avatar: String?,
    val friends: Array<String>?,
    val friendRequestsIn: Array<String>?,
    val friendRequestsOut: Array<String>?,
    val admin: Boolean?,
) : Principal

@Serializable
data class DiscordUser(
    val id: String,
    val username: String,
    val discriminator: String,
    val avatar: String?
)
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

package tech.atlas.api.service

import tech.atlas.api.model.Asset
import tech.atlas.api.model.Assets
import tech.atlas.api.model.NewAsset
import tech.atlas.api.service.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import java.security.MessageDigest

class AssetService {

    suspend fun getAssetByHash(hash: String): Asset? = dbQuery {
        Assets.select {
            Assets.hash eq hash
        }.mapNotNull { this.toAsset(it) }
            .singleOrNull()
    }

    suspend fun addAsset(asset: NewAsset): Asset {
        val hash = asset.hash ?: asset.content.md5

        getAssetByHash(hash) ?: dbQuery { // only insert if image doesnt exist
            Assets.insert {
                it[Assets.hash] = hash
                it[content] = asset.content
            }
        }

        return getAssetByHash(hash)!!
    }

    private fun toAsset(row: ResultRow): Asset =
        Asset(
            id = row[Assets.id],
            hash = row[Assets.hash],
            content = row[Assets.content]
        )
}

private val String.md5: String
    get() {
        val bytes = MessageDigest.getInstance("md5").digest(this.toByteArray())
        return bytes.joinToString("") {
            "%02x".format(it)
        }
    }
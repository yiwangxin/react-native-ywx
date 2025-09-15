package com.ywx.enums

enum class Environment(val value: Int) {
  Public(0),
  Test(1),
  Beta(2),
  Dev(3);

  companion object {
    fun fromValue(value: Int): Environment {
      return entries.firstOrNull { it.value == value } ?: Public
    }
  }
}

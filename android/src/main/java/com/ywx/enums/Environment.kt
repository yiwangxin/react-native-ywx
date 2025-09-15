package com.ywx.enums

enum class Environment(val value: Int) {
  Public(0),
  Szyx(1),
  Test(2),
  Beta(3),
  Dev(4),
  Custom(5);


  companion object {
    fun fromValue(value: Int): Environment {
      return entries.firstOrNull { it.value == value } ?: Public
    }
  }
}

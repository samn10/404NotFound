defmodule HelloPhoenix.Message do
  use HelloPhoenix.Web, :model

  @derive {Poison.Encoder, only: [:author, :content, :inserted_at]}

  schema "messages" do
    field :author, :string
    field :content, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:author, :content])
    |> validate_required([:author, :content])
  end
end